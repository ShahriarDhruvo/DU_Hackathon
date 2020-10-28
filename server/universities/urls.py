from django.urls import path, include

from .views import (
    UniversityDetails,

    DepartmentList,
    DepartmentCreate,
    DepartmentDelete,
    DepartmentUpdate,
    DepartmentDetails,

    CourseList,
    CourseCreate,
    CourseDelete,
    CourseUpdate,
    CourseDetails
    
)

urlpatterns = [
    path('details/', UniversityDetails.as_view(), name="university-details"),

    path('departments/list/', DepartmentList.as_view(), name="department-list"),
    path('departments/create/', DepartmentCreate.as_view(), name="department-create"),
    path('departments/delete/<str:department_pk>/', DepartmentDelete.as_view(), name="department-delete"),
    path('departments/update/<str:department_pk>/', DepartmentUpdate.as_view(), name="department-update"),
    path('departments/details/<str:department_pk>/', DepartmentDetails.as_view(), name="department-details"),

    path('departments/courses/<str:department_pk>/list/', CourseList.as_view(), name="course-list"),
    path('departments/courses/<str:department_pk>/create/', CourseCreate.as_view(), name="course-create"),
    path('departments/courses/<str:department_pk>/delete/<str:course_pk>/', CourseDelete.as_view(), name="course-delete"),
    path('departments/courses/<str:department_pk>/update/<str:course_pk>/', CourseUpdate.as_view(), name="course-update"),
    path('departments/courses/<str:department_pk>/details/<str:course_pk>/', CourseDetails.as_view(), name="course-details")
]
