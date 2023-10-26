from django.shortcuts import render
from Account_App.models import BusinessAccount
from django.shortcuts import render, get_object_or_404

def create_html_view(html_page_name):
    def html_view(request):
        # You can add any context data you want to pass to the HTML template here.
        user_is_authenticated = request.user.is_authenticated
        return render(request, html_page_name, {'user_is_authenticated': user_is_authenticated})
        # # Render the specified HTML page with the given context.
        # return render(request, , context)

    return html_view

def create_html_view_param(html_page_name):
    def html_view(request, business_account_id):
        # Check if a BusinessAccount with the provided ID exists, and if not, return a 404 error
        business_account = get_object_or_404(BusinessAccount, id=business_account_id)

        # You can add any context data you want to pass to the HTML template here.
        user_is_authenticated = request.user.is_authenticated

        return render(request, html_page_name, {'user_is_authenticated': user_is_authenticated, 'business_account': business_account})
    
    return html_view