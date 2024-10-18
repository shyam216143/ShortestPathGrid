from rest_framework.response import  Response
import json

from rest_framework.views import APIView

from .Manager.PathManager import PathManager


class GetPath(APIView):
    @staticmethod
    def get(request):
        try:
            path = PathManager().find_short_path(request)
            return Response({"result":"success", "data":path})
        except Exception as err:
            return Response(str(err), 500)
