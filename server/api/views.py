from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def apiOverview(request):
    api_urls = {
        'API Overview'                      : 'api/v1/',

        'User Login'                        : 'api/v1/accounts/login/',
        'User Logout'                       : 'api/v1/accounts/logout/',
        'User Details'                      : 'api/v1/accounts/user',
        'User Token Verify'                 : 'api/v1/accounts/token/verify/',
        'User Token Refresh'                : 'api/v1/accounts/token/refresh/',
        'User Registration'                 : 'api/v1/accounts/registration/',
        'User Password Reset'               : 'api/v1/accounts/password/reset/',
        'User Password Change'              : 'api/v1/accounts/password/change/',
        'User Social Login Twitter'         : 'api/v1/accounts/twitter',
        'User Social Login Facebook'        : 'api/v1/accounts/facebook',
        'User Account Confirm Email'        : 'api/v1/accounts/account-confirm-email/',
        'User Password Reset Confirm'       : 'api/v1/accounts/password/reset/confirm/',

        'Rooms List'                        : 'api/v1/room/list/',
        'Room Create'                       : 'api/v1/room/create/',
        'Room Update'                       : 'api/v1/room/update/<str:pk>/',
        'Room Delete'                       : 'api/v1/room/delete/<str:pk>/',
        'Room Details'                      : 'api/v1/room/details/<str:pk>/',
        'Room Add Admin'                    : 'api/v1/room/add/admin/<str:pk>/<str:username>',
        'Room Add Student'                  : 'api/v1/room/add/student/<str:pk>/<str:username>',
        'Room Add Teacher'                  : 'api/v1/room/add/teacher/<str:pk>/<str:username>',
        'Room Remove Admin'                 : 'api/v1/room/remove/admin/<str:pk>/<str:username>',
        'Room Remove Student'               : 'api/v1/room/remove/student/<str:pk>/<str:username>',
        'Room Remove Teacher'               : 'api/v1/room/remove/teacher/<str:pk>/<str:username>',

        'Sections List'                     : 'api/v1/sections/<str:rpk>/list/',
        #'Sections Create'                   : 'api/v1/'
	}

    return Response(api_urls)
    