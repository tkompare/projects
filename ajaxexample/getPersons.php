<?php
class Person
{
	public $id;
	public $firstName;
	public $lastName;
	public $email;
}
// Make a list of Persons
$Persons = array();
// Make a new Person
$Persons[0] = new Person;
$Persons[0]->id = 1;
$Persons[0]->firstName = 'John';
$Persons[0]->lastName = 'Public';
$Persons[0]->email = 'john@email.com';
// Make another Person
$Persons[1] = new Person;
$Persons[1]->id = 2;
$Persons[1]->firstName = 'Jane';
$Persons[1]->lastName = 'Doe';
$Persons[1]->email = 'jane@email.com';
// And a third Person
$Persons[2] = new Person;
$Persons[2]->id = 3;
$Persons[2]->firstName = 'Silly';
$Persons[2]->lastName = 'Sally';
$Persons[2]->email = 'sally@email.com';
// Here is the magic!
echo json_encode($Persons);
?>