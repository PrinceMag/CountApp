from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/<int:pk>/", views.NoteDetail.as_view(), name="note-detail"),  # Add this line
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("register/", views.CreateUserView.as_view(), name="register"),
]
