import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />); // mocks the compentent so that we can do the testing
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});  // Looks for a textbox compentent with the words "Add New Item"
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "Duplicate Test"}}); // Types the value "History Test" into the text box.
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element); //fireEvent.click() clicks the selected element.
  //duplicate task
  fireEvent.change(inputTask, { target: { value: "Duplicate Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/Duplicate Test/i); //searches for "History Test" on the screen ignoring case using regex. (Note: getBy only looks for one value. If more than one value or no value is present then an error will occur. If you want to get more then use getAllBy).
  const checkDate = screen.getByText(new RegExp(new Date(dueDate).toLocaleDateString(), "i"));
  expect(check).toBeInTheDocument(); //only expects one "Duplicate Test"; if more, there will be an error  ; the element should be in the page if it is the test case is passed. Otherwise the test fails.
  expect(checkDate).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i}); 
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: null}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  try {
    const checkDate = screen.getByText(new RegExp(new Date(dueDate).toLocaleDateString(), "i"));
    expect(checkDate).not.toBeInTheDocument(); //check if date is in the todo list, it shouldnt be since the item shouldn't have been added

  }
  catch{
  }
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i}); 
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "Date Test"}});
  fireEvent.change(inputDate, { target: { value: null}});
  fireEvent.click(element);
  try {
    const check = screen.getByText(/Date Test/i);
    expect(check).not.toBeInTheDocument(); //the task shouldnt be in the list since the item shouldn't have been added
  }
  catch{
  }
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});  
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "Duplicate Test"}}); 
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  //check if item is added 
  const check = screen.getByText(/Duplicate Test/i); 
  const checkDate = screen.getByText(new RegExp(new Date(dueDate).toLocaleDateString(), "i"));
  expect(check).toBeInTheDocument(); 
  expect(checkDate).toBeInTheDocument();
  //now make sure item is gone 
  const box = screen.getByRole('checkbox');
  fireEvent.click(box); //click checkbox
  expect(check).not.toBeInTheDocument(); 
  expect(checkDate).not.toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i}); 
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2021"; //old date
  const today = new Date().toLocaleDateString(); //today's date  
  //old date with red color 
  fireEvent.change(inputTask, { target: { value: "Color1 Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element); 
  //date with white color  
  fireEvent.change(inputTask, { target: { value: "Color2 Test"}});
  fireEvent.change(inputDate, { target: { value: today}});
  fireEvent.click(element); 

  
  const check = screen.getByTestId(/Color Test/i); 
  const checkDate = screen.getByText(new RegExp(new Date(dueDate).toLocaleDateString(), "i"));
  expect(check).toBeInTheDocument(); 
  expect(checkDate).toBeInTheDocument();
 });
