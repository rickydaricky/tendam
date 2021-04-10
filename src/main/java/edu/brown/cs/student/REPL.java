package edu.brown.cs.student;

import edu.brown.cs.student.main.Command;

import java.util.HashMap;
import java.util.Map;

/**
 * Class for REPL.
 */
public class REPL {
  private static Map<String, Command> commands = new HashMap<>();

  /**
   * Sets up a REPL with no command registered.
   */
  public REPL() {
  }

  /**
   * Registers a new command into the commands map.
   *
   * @param commandName command name (user input)
   * @param command     a Command for execution
   */
  public void registerCommand(String commandName, Command command) {
    commands.put(commandName, command);
  }

  /**
   * Parses and runs the user input command.
   * Reports an error if command does not exist.
   *
   * @param input user input
   * @throws Exception throws an exception if command does not exist.
   */
  public void run(String input) throws Exception {
    String[] command = input.split(" ", 2);
    String commandName = command[0];
    String parameters = command.length > 1 ? command[1] : "";
    Command c = commands.get(commandName);
    if (c != null) {
      c.execute(parameters);
    } else {
      System.err.println("ERROR: Command not found");
    }

  }


}
