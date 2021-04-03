package edu.brown.cs.student;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class User implements HasCoordinate, hasRanking<User> {
  //id is shared between a user and a person
  private final String id;
  //not sure if the id is the same as the username
  private  String userName;
  private Map<String, Double> surveys;
  private List<String> friends;
  private  String password;
  private String email;

  public User(String id, String userName, String password, String email, List<String> friends) {
    this.id = id;
    this.userName = userName;
    this.surveys = new HashMap<>();
    this.friends = friends;
    this.password = password;
    this.email = email;
  }

  public String getId() {
    return id;
  }

  public String getUserName() {
    return userName;
  }

  //method to add new surveys or games when one is created
  //this should be done for every user
  public void addNewSurvey(String surveyName) {
    surveys.put(surveyName, null);
  }

  public void addSurveyData(String surveyName, double surveyData) {
    surveys.replace(surveyName, surveyData);
  }

  public void addFriends(String friendID) {
    friends.add(friendID);
  }

  // TODO we still need to figure out how to represent people as coordinates
  //  This includes handling missing values.
  @Override
  public double[] getCoordinate() {
    return new double[0];
  }

  @Override
  public String getID() {
    return id;
  }

  // TODO
  @Override
  public List<String> getRankings() {
    return null;
  }

  @Override
  public int getRanking(String obj) {
    // TODO
    return 0;
  }

  private Object[] getSigFields() {
    return new Object[] {id};
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) {
      return true;
    }
    if (!(obj instanceof User)) {
      return false;
    }
    User second = (User) obj;
    for (int i = 0; i < this.getSigFields().length; i++) {
      if (!Objects.equals(this.getSigFields()[i], second.getSigFields()[i])) {
        return false;
      }
    }
    return true;
    // return super.equals(obj);
  }

  @Override
  public int hashCode() {
    return id.hashCode();
  }
}
