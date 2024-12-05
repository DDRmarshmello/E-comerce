using System;
using System.Collections.Generic;

namespace Ecomerce_API.Models;

public partial class Appliedcoupon
{
    public int Id { get; set; }

    public int PurchaseId { get; set; }

    public int CouponId { get; set; }

    public decimal DiscountApplied { get; set; }

    public DateTime? AppliedAt { get; set; }

    public virtual Coupon Coupon { get; set; } = null!;

    public virtual Purchase Purchase { get; set; } = null!;
}
