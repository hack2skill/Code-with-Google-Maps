from django.conf import settings
import requests
from .models import UserProfile
import smtplib
from email.mime.text import MIMEText
from django.http import JsonResponse


def Directions(*args, **kwargs):
    lat_a = kwargs.get("lat_a")
    long_a = kwargs.get("long_a")
    lat_b = kwargs.get("lat_b")
    long_b = kwargs.get("long_b")

    origin = f'{lat_a},{long_a}'
    destination = f'{lat_b},{long_b}'

    result = requests.get(
        'https://maps.googleapis.com/maps/api/directions/json?',
        params={
            'origin': origin,
            'destination': destination,
            "key": settings.GOOGLE_API_KEY
        })

    directions = result.json()

    if directions["status"] == "OK":
        route = directions["routes"][0]["legs"][0]
        origin = route["start_address"]
        destination = route["end_address"]
        distance = route["distance"]["text"]
        duration = route["duration"]["text"]

        steps = [
            [
                s["distance"]["text"],
                s["duration"]["text"],
                s["html_instructions"],

            ]
            for s in route["steps"]]

        return {
            "origin": origin,
            "destination": destination,
            "distance": distance,
            "duration": duration,
            "steps": steps
        }
    return None


def mail_request(request, to_id):
    if request.method == 'POST' and to_id:
        from_user = UserProfile.objects.get(user=request.user)
        to_user = UserProfile.objects.get(id=to_id)
        smtp_server = 'smtp.gmail.com'
        smtp_port = 587
        smtp_username = settings.EMAIL_HOST_USER
        smtp_password = settings.EMAIL_HOST_PASSWORD
        smtp_connection = smtplib.SMTP(smtp_server, smtp_port)
        smtp_connection.starttls()
        smtp_connection.login(smtp_username, smtp_password)
        message_text = f'Hey There You Got An Request From {request.user.username} ' \
                       f'For Charging\nKindly Approve The Request Within 4minutes\nHere' \
                       f' Is The Contact Information Of Requester\nEmail-Id: {request.user.email}\n' \
                       f'Phone Number: {from_user.phone_number}\n' \
                       f'Hurry Up!!!!\nHead On To Account->Request\nThank You\nVoltage Vikings.'
        msg = MIMEText(message_text)
        msg['Subject'] = 'Charge Request!!!!'
        msg['From'] = smtp_username
        msg['To'] = to_user.user.email
        smtp_connection.sendmail(smtp_username, to_user.user.email, msg.as_string())
        smtp_connection.quit()
        return JsonResponse({'status': 'success', 'message': 'Mail Sent'})
    return JsonResponse({'status': 'error', 'message': 'Request Not Accepted By User!!'})
