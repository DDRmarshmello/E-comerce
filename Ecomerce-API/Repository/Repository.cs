using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Ecomerce_API.Models;

namespace Ecomerce_API.Repository
{
    public interface IRepository<T> where T : class
    {
        Task<T?> GetByIdAsync(int id, params Func<IQueryable<T>, IQueryable<T>>[] includes);
        Task<IEnumerable<T>> GetAllAsync(params Func<IQueryable<T>, IQueryable<T>>[] includes);
        Task<T?> AddAsync(T entity);
        Task<T?> UpdateAsync(T entity);
        Task<Response> DeleteAsync(int id);
    }


    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly ApicContext _context;
        private readonly DbSet<T> _dbSet;
        private readonly string _primaryKeyPropertyName;
        private readonly ILogger<Repository<T>> _logger;
        public Repository(ApicContext context, ILogger<Repository<T>> logger)
        {
            _context = context;
            _dbSet = _context.Set<T>();
            _logger = logger;
            // Obtener el nombre de la propiedad clave primaria de la entidad
            var entityType = _context.Model.FindEntityType(typeof(T));
            var key = entityType.FindPrimaryKey();
            _primaryKeyPropertyName = key?.Properties.FirstOrDefault()?.Name;
        }

        public async Task<T?> GetByIdAsync(int id, params Func<IQueryable<T>, IQueryable<T>>[] includes)
        {
            if (_primaryKeyPropertyName == null)
            {
                throw new InvalidOperationException("No primary key found for entity.");
            }

            IQueryable<T> query = _dbSet;

            // Incluir las relaciones
            //foreach (var include in includes)
            //{
            //    query = query.Include(include);
            //}

            foreach (var include in includes)
            {
                // Aquí aplicamos la función que modifica el query
                query = include(query); 
            }

            // Construir la expresión para la clave primaria
            var parameter = Expression.Parameter(typeof(T), "e");
            var property = Expression.Property(parameter, _primaryKeyPropertyName);
            var constant = Expression.Constant(id);
            var equals = Expression.Equal(property, constant);
            var lambda = Expression.Lambda<Func<T, bool>>(equals, parameter);

            // Filtrar por la clave primaria
            return await query.FirstOrDefaultAsync(lambda);
        }

        public async Task<IEnumerable<T>> GetAllAsync(params Func<IQueryable<T>, IQueryable<T>>[] includes)
        {
            IQueryable<T> query = _dbSet;

            // Incluye las relaciones que fueron pasadas como parámetros
            foreach (var include in includes)
            {
                query = include(query);
            }

            return await query.ToListAsync();
        }

        public async Task<T?> AddAsync(T entity)
        {
            try
            {
                await _dbSet.AddAsync(entity);
                await _context.SaveChangesAsync();
                return entity;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public async Task<T?> UpdateAsync(T entity)
        {
            try
            {
                _dbSet.Update(entity);
                await _context.SaveChangesAsync();
                return entity;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public async Task<Response> DeleteAsync(int id)
        {
            try
            {
                var entity = await GetByIdAsync(id);
                if (entity == null)
                {
                    return new Response { IsSuccess = false, Message = "Emp not found" };
                }
                await _context.SaveChangesAsync();
                _dbSet.Remove(entity);
                return new Response { IsSuccess = true };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }

}
