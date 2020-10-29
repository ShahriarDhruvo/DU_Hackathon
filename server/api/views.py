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
        'User Details'                      : 'api/v1/accounts/user/',
        'User Token Verify'                 : 'api/v1/accounts/token/verify/',
        'User Token Refresh'                : 'api/v1/accounts/token/refresh/',
        'User Registration'                 : 'api/v1/accounts/registration/',
        'User Password Reset'               : 'api/v1/accounts/password/reset/',
        'User Password Change'              : 'api/v1/accounts/password/change/',
        'User Social Login Twitter'         : 'api/v1/accounts/twitter/',
        'User Social Login Facebook'        : 'api/v1/accounts/facebook/',
        'User Account Confirm Email'        : 'api/v1/accounts/account-confirm-email/',
        'User Password Reset Confirm'       : 'api/v1/accounts/password/reset/confirm/',

        'University Details'                : 'api/v1/university/details/',

        'Departments List'                  : 'api/v1/university/departments/list/',
        'Departments Create'                : 'api/v1/university/departments/create/',
        'Departments Update'                : 'api/v1/university/departments/update/<str:department_pk>/',
        'Departments Delete'                : 'api/v1/university/departments/delete/<str:department_pk>/',
        'Departments Details'               : 'api/v1/university/departments/details/<str:department_pk>/',
                
        'Courses List'                      : 'api/v1/university/departments/courses/<str:department_pk>/list/',
        'Courses Create'                    : 'api/v1/university/departments/courses/<str:department_pk>/create/',
        'Courses Update'                    : 'api/v1/university/departments/courses/<str:department_pk>/update/<str:course_pk>/',
        'Courses Delete'                    : 'api/v1/university/departments/courses/<str:department_pk>/delete/<str:course_pk>/',
        'Courses Details'                   : 'api/v1/university/departments/courses/<str:department_pk>/details/<str:course_pk>/',

        'Rooms List'                        : 'api/v1/rooms/list/',
        'Rooms Create'                      : 'api/v1/rooms/create/',
        'Rooms Update'                      : 'api/v1/rooms/update/<str:room_pk>/',
        'Rooms Delete'                      : 'api/v1/rooms/delete/<str:room_pk>/',
        'Rooms Details'                     : 'api/v1/rooms/details/<str:room_pk>/',
        'Rooms Add Admin'                   : 'api/v1/rooms/add/admin/<str:room_pk>/<str:username>/',
        'Rooms Add Student'                 : 'api/v1/rooms/add/student/<str:room_pk>/<str:username>/',
        'Rooms Add Teacher'                 : 'api/v1/rooms/add/teacher/<str:room_pk>/<str:username>/',
        'Rooms Remove Admin'                : 'api/v1/rooms/remove/admin/<str:room_pk>/<str:username>/',
        'Rooms Remove Student'              : 'api/v1/rooms/remove/student/<str:room_pk>/<str:username>/',
        'Rooms Remove Teacher'              : 'api/v1/rooms/remove/teacher/<str:room_pk>/<str:username>/',

        'Sections List'                     : 'api/v1/rooms/sections/<str:room_pk>/list/',
        'Sections Create'                   : 'api/v1/rooms/sections/<str:room_pk>/create/',
        'Sections Update'                   : 'api/v1/rooms/sections/<str:room_pk>/update/<str:section_pk>/',
        'Sections Delete'                   : 'api/v1/rooms/sections/<str:room_pk>/delete/<str:section_pk>/',
        'Sections Details'                  : 'api/v1/rooms/sections/<str:room_pk>/details/<str:section_pk>/',

        'Items List'                        : 'api/v1/rooms/sections/items/<str:room_pk>/<str:section_pk>/list/',
        'Items Create'                      : 'api/v1/rooms/sections/items/<str:room_pk>/<str:section_pk>/create/',
        # 'Items Update'                      : 'api/v1/rooms/sections/items/<str:room_pk>/<str:section_pk>/update/<str:item_pk>/',
        # 'Items Delete'                      : 'api/v1/rooms/sections/items/<str:room_pk>/<str:section_pk>/delete/<str:item_pk>/',
        # 'Items Details'                     : 'api/v1/rooms/sections/items/<str:room_pk>/<str:section_pk>/details/<str:item_pk>/',
        'Items Update'                      : 'api/v1/rooms/sections/items/<str:room_pk>/update/<str:item_pk>/',
        'Items Delete'                      : 'api/v1/rooms/sections/items/<str:room_pk>/delete/<str:item_pk>/',
        'Items Details'                     : 'api/v1/rooms/sections/items/<str:room_pk>/details/<str:item_pk>/',

        # 'Comment List'                      : 'api/v1/rooms/sections/items/comments/<str:room_pk>/<str:section_pk>/<str:item_pk>/list/',
        # 'Comment Create'                    : 'api/v1/rooms/sections/items/comments/<str:room_pk>/<str:section_pk>/<str:item_pk>/create/',
        # 'Comment Update'                    : 'api/v1/rooms/sections/items/comments/<str:room_pk>/<str:section_pk>/<str:item_pk>/update/<str:comment_pk>/',
        # 'Comment Delete'                    : 'api/v1/rooms/sections/items/comments/<str:room_pk>/<str:section_pk>/<str:item_pk>/delete/<str:comment_pk>/'
        'Comment List'                      : 'api/v1/rooms/sections/items/comments/<str:room_pk>/<str:item_pk>/list/',
        'Comment Create'                    : 'api/v1/rooms/sections/items/comments/<str:room_pk>/<str:item_pk>/create/',
        'Comment Update'                    : 'api/v1/rooms/sections/items/comments/<str:room_pk>/update/<str:comment_pk>/',
        'Comment Delete'                    : 'api/v1/rooms/sections/items/comments/<str:room_pk>/delete/<str:comment_pk>/'

	}

    return Response(api_urls)
    