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

        'Department List'                   : 'api/v1/university/departments/list/',
        'Department Create'                 : 'api/v1/university/departments/create/',
        'Department Update'                 : 'api/v1/university/departments/update/<str:department_pk>/',
        'Department Delete'                 : 'api/v1/university/departments/delete/<str:department_pk>/',
        'Department Details'                : 'api/v1/university/departments/details/<str:department_pk>/',
                
        'Course List'                       : 'api/v1/university/departments/courses/<str:department_pk>/list/',
        'Course Create'                     : 'api/v1/university/departments/courses/<str:department_pk>/create/',
        'Course Update'                     : 'api/v1/university/departments/courses/<str:department_pk>/update/<str:course_pk>/',
        'Course Delete'                     : 'api/v1/university/departments/courses/<str:department_pk>/delete/<str:course_pk>/',
        'Course Details'                    : 'api/v1/university/departments/courses/<str:department_pk>/details/<str:course_pk>/',

        'Room List'                         : 'api/v1/rooms/<str:department_pk>/list/',
        'User Room List'                    : 'api/v1/rooms/user_room_list/',
        'User Pending Request Room List'    : 'api/v1/rooms/user_pending_request_room_list/',
        'Room Create'                       : 'api/v1/rooms/create/',
        'Room Update'                       : 'api/v1/rooms/update/<str:room_pk>/',
        'Room Delete'                       : 'api/v1/rooms/delete/<str:room_pk>/',
        'Room Details'                      : 'api/v1/rooms/details/<str:room_pk>/',
        'Room Members'                      : 'api/v1/rooms/members/<str:room_pk>/',
        'Room Check CR'                     : 'api/v1/rooms/check_CR/<str:room_pk>/',
        'Room Add CR'                       : 'api/v1/rooms/add/<str:room_pk>/class_representative/<str:username>/',
        'Room Add Student'                  : 'api/v1/rooms/add/<str:room_pk>/student/<str:username>/',
        'Room Add Teacher'                  : 'api/v1/rooms/add/<str:room_pk>/teacher/<str:username>/',
        'Room Remove CR'                    : 'api/v1/rooms/remove/<str:room_pk>/class_representative/<str:username>/',
        'Room Remove Student'               : 'api/v1/rooms/remove/<str:room_pk>/student/<str:username>/',
        'Room Remove Teacher'               : 'api/v1/rooms/remove/<str:room_pk>/teacher/<str:username>/',
        'Room Pending Request List'         : 'api/v1/rooms/pending_requests/<str:room_pk>/list/',
        'Room Pending Request Create'       : 'api/v1/rooms/pending_requests/<str:room_pk>/create/',
        'Room Pending Request Delete'       : 'api/v1/rooms/pending_requests/<str:room_pk>/delete/<str:pending_request_pk>/',

        'Section List'                      : 'api/v1/rooms/sections/<str:room_pk>/list/',
        'Section Create'                    : 'api/v1/rooms/sections/<str:room_pk>/create/',
        'Section Update'                    : 'api/v1/rooms/sections/<str:room_pk>/update/<str:section_pk>/',
        'Section Delete'                    : 'api/v1/rooms/sections/<str:room_pk>/delete/<str:section_pk>/',
        'Section Details'                   : 'api/v1/rooms/sections/<str:room_pk>/details/<str:section_pk>/',

        'Item List'                         : 'api/v1/rooms/sections/items/<str:room_pk>/<str:section_pk>/list/',
        'Item Create'                       : 'api/v1/rooms/sections/items/<str:room_pk>/<str:section_pk>/create/',
        'Item Update'                       : 'api/v1/rooms/sections/items/<str:room_pk>/update/<str:item_pk>/',
        'Item Delete'                       : 'api/v1/rooms/sections/items/<str:room_pk>/delete/<str:item_pk>/',
        'Item Details'                      : 'api/v1/rooms/sections/items/<str:room_pk>/details/<str:item_pk>/',

        'Comment List'                      : 'api/v1/rooms/sections/items/comments/<str:room_pk>/<str:item_pk>/list/',
        'Comment Create'                    : 'api/v1/rooms/sections/items/comments/<str:room_pk>/<str:item_pk>/create/',
        'Comment Update'                    : 'api/v1/rooms/sections/items/comments/<str:room_pk>/update/<str:comment_pk>/',
        'Comment Delete'                    : 'api/v1/rooms/sections/items/comments/<str:room_pk>/delete/<str:comment_pk>/',

        'Notification List'                 : 'api/v1/notifications/list/',
        'Notification Delete'               : 'api/v1/notifications/delete/<str:notification_pk>/'

	}

    return Response(api_urls)
    