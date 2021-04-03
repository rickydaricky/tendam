package edu.brown.cs.student;

import java.io.FileNotFoundException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public class Matcher {

  /*todo this class will contain method that gets all the
   users, run the kdtree, run gale shapely, then insert matches back into database
   */

  private final String databaseFile;
  private Database db;

  public Matcher(String file) throws FileNotFoundException, SQLException {
    this.databaseFile = file;
    this.db = new Database(databaseFile);
  }

  private List<User> getUsers() {
    try {
      List<User> users = db.getAllUsers();
      return users;
    } catch (SQLException throwables) {
      throwables.printStackTrace();
      return null;
    }
  }

  /**
   * Matches all users and stores the matches in the database.
   *
   * @throws SQLException if the database cannot be accessed.
   */
  public void makeMatches() throws SQLException {
    makeMatches(getUsers());
  }

  /**
   * Matches the given users and stores the matches in the database.
   *
   * @param users a list of users to match
   * @throws SQLException if the database cannot be accessed.
   */
  public void makeMatches(List<User> users) throws SQLException {
    Map<User, User> matches = GaleShapley.galeShapleyAlgo(users, users);
    for (Map.Entry<User, User> match : matches.entrySet()) {
      // TODO avoid repeating the "adding"?
      User user1 = match.getKey();
      User user2 = match.getValue();
      // Update all users manually
      user1.addFriends(user2.getId());
      user2.addFriends(user1.getId());
      // Update the database with friends
      db.addFriends(user1.getID(), user2.getID());
      db.addFriends(user2.getID(), user1.getID());
    }
  }
}
