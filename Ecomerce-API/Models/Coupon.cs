using System;
using System.Collections.Generic;

namespace Ecomerce_API.Models;

public partial class Coupon
{
    public int Id { get; set; }

    public string Code { get; set; } = null!;

    public decimal? DiscountAmount { get; set; }

    public decimal? DiscountPercentage { get; set; }

    public decimal? MaxDiscountAmount { get; set; }

    public decimal? MinPurchaseAmount { get; set; }

    public DateTime? ExpirationDate { get; set; }

    public int? UsageLimit { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<Appliedcoupon> Appliedcoupons { get; set; } = new List<Appliedcoupon>();
}
