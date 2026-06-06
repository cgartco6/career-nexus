import json
import hashlib
from starlette.responses import JSONResponse
import stripe

async def POST(request):
    """Processes financial operations, payment links, and owner split-settlements."""
    try:
        body = await request.json()
        gateway = body.get("gateway_choice", "eft").lower()
        amount_zar = float(body.get("total_zar", 450.00))
        tx_ref = f"TXN-NEXUS-{int(amount_zar)}"

        # Automated Operational Fund Splitting Setup Calculations
        owner_share_50 = round(amount_zar * 0.50, 2)
        african_bank_10 = round(amount_zar * 0.10, 2)
        upgrades_40 = round(amount_zar * 0.40, 2)

        if gateway == "stripe":
            stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "sk_test_mock")
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{'price_data': {'currency': 'usd', 'product_data': {'name': 'Nexus Premium Pack'}, 'unit_amount': 2500}, 'quantity': 1}],
                mode='payment',
                success_url='https://localhost:3000',
                cancel_url='https://localhost:3000',
            )
            return JSONResponse({"gateway": "Stripe", "checkout_url": session.url})

        elif gateway == "ozow":
            site_code = "NEXUS-ZA"
            private_key = "ozow_secret_prod"
            raw_string = f"{site_code}{tx_ref}{amount_zar:.2f}ZARZA{private_key}".lower()
            hash_check = hashlib.sha512(raw_string.encode('utf-8')).hexdigest()
            return JSONResponse({
                "gateway": "Ozow",
                "checkout_url": f"https://pay.ozow.com/?SiteCode={site_code}&Amount={amount_zar:.2f}&TransactionReference={tx_ref}&HashCheck={hash_check}"
            })

        # Fallback to direct corporate banking ledger instructions
        return JSONResponse({
            "gateway": "Direct EFT",
            "payment_instructions": f"FNB Account: 62234567890, Branch: 250655, Reference: {tx_ref}",
            "ledger_payout_splits": {
                "standard_bank_owner_50": owner_share_50,
                "african_bank_holdings_10": african_bank_10,
                "platform_upgrade_reserve_40": upgrades_40
            }
        })
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
