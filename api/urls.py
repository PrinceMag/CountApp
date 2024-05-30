from django.urls import path
from . import views
from .views import NoteListCreate, NoteRetrieveUpdate, NoteDelete, NoteSearch, CreateUserView
urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("notes/<int:pk>/", views.NoteRetrieveUpdate.as_view(), name="note-detail"),
    path("notes/search/", views.NoteSearch.as_view(), name="note-search"),
    path("users/", views.CreateUserView.as_view(), name="user-create"),
    path("register/", views.CreateUserView.as_view(), name="register"),
]
