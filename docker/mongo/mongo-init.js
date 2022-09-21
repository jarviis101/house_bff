db.createUser(
  {
    user: "user",
    pwd: "password",
    roles: [
      {
        role: "readWrite",
        db: "house_bff_db"
      }
    ]
  }
);