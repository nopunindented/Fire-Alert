from twilio.rest import Client

account_SID = "AC6b5b32490a3c8d3ac39d2ca41ffa2d0d"
account_token= "be4c0f36bc8684f67d80102d228d7612"

twilio_phone = "+12705184150"
my_phone = "+18254611252"

client= Client(account_SID, account_token)

message = client.messages.create(
        body= "Fire Alert! has detected a fire nearby! Please check the app immediately for proximity to your current location.",
        from_=twilio_phone,
        to=my_phone
    )