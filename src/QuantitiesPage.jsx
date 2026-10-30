import { useState } from "react";
import { useNavigate } from "react-router";
import "./quantities.css";

const MAX_TICKETS = 5;

const TICKET_TYPES = [
  // ── Day 1: 26th December ──────────────────────────────────────────────
  {
    id: "eb_d1",
    name: "Early Bird",
    description: "Early bird entry – valid for 26th December",
    date: "26 Dec",
    day: "Saturday",
    price: 199,
    soldOut: false,
  },
  {
    id: "couple_d1",
    name: "Couple Ticket",
    description: "Entry for 2 – valid for 26th December",
    date: "26 Dec",
    day: "Saturday",
    price: 350,
    originalPrice: 400,
    discount: "Save ₹50",
    soldOut: false,
  },
  {
    id: "premium_d1",
    name: "Premium Ticket",
    description: "Premium entry – valid for 26th December",
    date: "26 Dec",
    day: "Saturday",
    price: 299,
    soldOut: false,
  },

  // ── Day 2: 27th December ──────────────────────────────────────────────
  {
    id: "eb_d2",
    name: "Early Bird",
    description: "Early bird entry – valid for 27th December",
    date: "27 Dec",
    day: "Sunday",
    price: 199,
    soldOut: false,
  },
  {
    id: "couple_d2",
    name: "Couple Ticket",
    description: "Entry for 2 – valid for 27th December",
    date: "27 Dec",
    day: "Sunday",
    price: 350,
    originalPrice: 400,
    discount: "Save ₹50",
    soldOut: false,
  },
  {
    id: "premium_d2",
    name: "Premium Ticket",
    description: "Premium entry – valid for 27th December",
    date: "27 Dec",
    day: "Sunday",
    price: 299,
    soldOut: false,
  },
];


export default function QuantitiesPage() {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState(
    Object.fromEntries(TICKET_TYPES.map((t) => [t.id, 0]))
  );

  const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalAmount = TICKET_TYPES.filter((t) => !t.soldOut).reduce(
    (sum, t) => sum + t.price * quantities[t.id],
    0
  );

  const handleQtyChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: Number(value) }));
  };

  const handleCheckout = () => {
    if (totalTickets === 0 || totalTickets > MAX_TICKETS) return;
    navigate("/form", {
      state: {
        quantities,
        totalAmount,
        totalTickets,
      },
    });
  };

  return (
    <div className="qp-root">
      {/* ── MAIN LAYOUT ── */}
      <div className="qp-layout">

        {/* ── LEFT: Tickets ── */}
        <div className="qp-left">
          {/* Event header */}
          <div className="qp-event-header">
            <button className="qp-back-btn" onClick={() => navigate("/")}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </button>
            <div className="qp-header-info">
              <h1 className="qp-event-title">
                Disney Land Food Fest – The Happiest Food Festival 2.2
              </h1>
              <p className="qp-event-meta">
                📅 26 December – 27 December 2026 &nbsp;|&nbsp; 11:00 AM – 11:00 PM
              </p>
            </div>
          </div>

          {/* Ticket rows */}
          <div className="qp-ticket-list">
            {TICKET_TYPES.map((ticket, i) => {
              // Insert a day-separator heading before Day 2 tickets
              const isFirstDay2 = ticket.id === "eb_d2";
              return (
                <div key={ticket.id}>
                  {isFirstDay2 && (
                    <div className="qp-day-separator">
                      <span>Day 2 — Sunday, 27th December</span>
                    </div>
                  )}
                  {i === 0 && (
                    <div className="qp-day-separator">
                      <span>Day 1 — Saturday, 26th December</span>
                    </div>
                  )}
                  <div
                    className={`qp-ticket-row${ticket.soldOut ? " qp-ticket-row--soldout" : ""}`}
                  >
                    <div className="qp-ticket-info">
                      <div className="qp-ticket-name-row">
                        <p className="qp-ticket-name">{ticket.name}</p>
                        {ticket.discount && (
                          <span className="qp-discount-badge">{ticket.discount}</span>
                        )}
                        {ticket.soldOut && (
                          <span className="qp-sold-out-badge">Sold Out</span>
                        )}
                      </div>
                      <p className="qp-ticket-desc">{ticket.description}</p>
                      <p className="qp-ticket-price">
                        ₹{ticket.price}
                        {ticket.originalPrice && (
                          <span className="qp-ticket-original-price"> ₹{ticket.originalPrice}</span>
                        )}
                      </p>
                    </div>

                    <div className="qp-ticket-right">
                      {ticket.soldOut ? (
                        <span className="qp-sold-out-text">Unavailable</span>
                      ) : (
                        <div className="qp-qty-wrap">
                          <select
                            className="qp-qty-select"
                            value={quantities[ticket.id]}
                            onChange={(e) => handleQtyChange(ticket.id, e.target.value)}
                          >
                            {Array.from(
                              { length: Math.min(MAX_TICKETS, MAX_TICKETS - totalTickets + quantities[ticket.id]) + 1 },
                              (_, n) => (
                                <option key={n} value={n}>
                                  Qty: {n}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      )}
                      <span className="qp-ticket-subtotal">
                        {ticket.soldOut
                          ? "–"
                          : `INR ${(ticket.price * quantities[ticket.id]).toLocaleString("en-IN")}`}
                      </span>
                    </div>

                    {i < TICKET_TYPES.length - 1 && !TICKET_TYPES[i + 1]?.id?.startsWith("eb_d2") && (
                      <div className="qp-divider" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: Summary ── */}
        <div className="qp-summary">
          <div className="qp-summary-row">
            <span className="qp-summary-label">Ticket Quantity</span>
            <span className="qp-summary-value">{totalTickets}</span>
          </div>
          <div className="qp-summary-row">
            <span className="qp-summary-label">Ticket Amount</span>
            <span className="qp-summary-value">
              INR {totalAmount.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="qp-summary-divider" />

          <div className="qp-summary-row qp-summary-total">
            <span className="qp-summary-label">Total Amount</span>
            <span className="qp-summary-value">
              INR {totalAmount.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            className={`qp-checkout-btn${totalTickets === 0 ? " qp-checkout-btn--disabled" : ""}`}
            onClick={handleCheckout}
            disabled={totalTickets === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
