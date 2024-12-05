using System;
using System.Collections.Generic;

namespace Ecomerce_API.Models;

public partial class Purchase
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public decimal TotalAmount { get; set; }

    public decimal Taxes { get; set; }

    public DateTime? PurchaseDate { get; set; }

    public string? Status { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<Appliedcoupon> Appliedcoupons { get; set; } = new List<Appliedcoupon>();

    public virtual ICollection<Purchasedetail> Purchasedetails { get; set; } = new List<Purchasedetail>();

    public virtual User User { get; set; } = null!;
}
