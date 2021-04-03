package edu.brown.cs.student;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;

public class MatcherTest {
  private static final Path dbPath = Path.of(".", "data", "tempUsers.sqlite3");
  private Database db;
  private Matcher matcher;

  @Before
  public void setUp() throws FileNotFoundException, SQLException {
    String urlToDB = "jdbc:sqlite:" + dbPath.toString();
    DriverManager.getConnection(urlToDB);
    db = new Database("data/tempUsers.sqlite3");
    for (int i = 1; i <= 10; i++) {
      db.insertUser("id" + i, "user" + i, "??", "user" + i + "@example.com");
    }
    matcher = new Matcher(dbPath.toString());
  }

  @After
  public void tearDown() throws IOException {
    Files.deleteIfExists(dbPath);
  }

  private static Set<String> getIds(Collection<? extends User> users) {
    return users.stream().map(User::getId).collect(Collectors.toSet());
  }

  private static Set<String> getUsernames(Collection<? extends User> users) {
    return users.stream().map(User::getUserName).collect(Collectors.toSet());
  }

  private static User findWithId(List<User> users, String id) {
    return users.stream().filter(u -> u.getId().equals(id)).findFirst().orElseThrow();
  }

  // TODO actually give the friends preferences
  @Test(expected = RuntimeException.class)
  public void testSingleMatching() throws SQLException {
    Map<User, User> gsMatches = GaleShapley.galeShapleyAlgo(db.getAllUsers(), db.getAllUsers());
    matcher.makeMatches();
    List<User> users = db.getAllUsers();
    for (int i = 1; i <= 10; i++) {
      String id = "id" + i;
      User user = findWithId(users, id);
      User intendedMatch = gsMatches.get(user);
      assertEquals(List.of(intendedMatch.getID()), db.findFriends(id));
    }
  }
}
