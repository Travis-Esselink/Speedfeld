from app import db

class User(db.Model):
    __tablename__= "users"
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100), unique = True, nullable = False)
    tests = db.Column(db.Integer)
    sumWPM = db.Column(db.Integer)
    averageWPM = db.Column(db.Integer)
    password_hash = db.Column(db.Text, nullable = False)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "tests": self.tests,
            "averageWPM": self.averageWPM
        }
    
    def __repr__(self):
        return f"<User {self.id} - {self.username}"

class Quote (db.Model):
    __tablename__ = 'quotes'
    id = db.Column(db.Integer, primary_key = True)
    text = db.Column(db.Text, nullable = False)
    author = db.Column(db.Text, nullable = False)
    # season = db.Column(db.Text, nullable = False)
    # episode = db.Column(db.Text, nullable = False)

    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'author': self.author,
            # 'season': self.season,
            # 'episode': self.episode
        }

    def __repr__(self):
        return f"<Quote {self.id} - {self.author}>"

