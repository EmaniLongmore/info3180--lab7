from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect
from flask_cors import CORS
from .config import Config
import os



app = Flask(__name__)
app.config.from_object(Config)
app.config['UPLOAD_FOLDER'] = os.path.join(app.instance_path, 'uploads')


db = SQLAlchemy(app)
migrate = Migrate(app, db)
csrf = CSRFProtect(app)
CORS(app, supports_credentials=True)

csrf.init_app(app)

from app import views, models
