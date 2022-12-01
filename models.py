from app import db

class User(db.Model):
    __tablename__= "users"
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100), unique = True, nullable = False)
    # tests = db.Column(db.Integer, server_default="0")
    # sumWPM = db.Column(db.Integer, server_default="0")
    # averageWPM = db.Column(db.Integer, server_default="0")
    password_hash = db.Column(db.Text, nullable = False)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            # "sumWPM": self.sumWPM,
            # "tests": self.tests,
            # "averageWPM": self.averageWPM
        }
    
    def __repr__(self):
        return f"<User {self.id} - {self.username} - tests: {self.tests}>"


class Tests(db.Model):
    __tablename__= "tests"
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_name = db.Column(db.String(100), db.ForeignKey('users.username'))
    WPM = db.Column(db.Integer, server_default="0")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user_name': self.user_name,
            'WPM': self.WPM
        }
    
    def __repr__(self):
        return f"<Quote {self.id} - {self.user_name} - {self.WPM}>"


class Quote (db.Model):
    __tablename__ = 'quotes'
    id = db.Column(db.Integer, primary_key = True)
    text = db.Column(db.Text, nullable = False)
    author = db.Column(db.Text, nullable = False)

    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'author': self.author
        }

    def __repr__(self):
        return f"<Quote {self.id} - {self.author}>"

