// todos.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


const { nanoid } = require('nanoid')
const { TasksSortField, TaskPriority } = require('../../src/features/todos/todosTypes')

describe('todos functionality tests', () => {
  before(()=>{
    cy.visit('http://localhost:3000')
  })
  const taskTitle = nanoid()

  it('should load todos page', () => {
    //checking fields empty
    cy.get('input[name="title"]').should('have.value', '')
    cy.get('select[name="priority"]').should('have.value', TaskPriority.normal)
  })

  it('should create task', () => {
    //create a task
    cy.get('input[name="title"]').type(taskTitle)
    cy.get('select[name="priority"]').select(TaskPriority.high)
    cy.get('button[type="submit"]').click()

    //verify task created
    cy.get('input[name="title"]').should('have.value', '')
    cy.get('select[name="priority"]').should('have.value', TaskPriority.normal)
    cy.get(`span:contains("${taskTitle}")`).should('exist')
    cy.get(`span:contains("${taskTitle}")`)
      .closest('.todo-list-item')
      .find('span')
      .contains(TaskPriority[TaskPriority.high])
  })

  it('should mark task complete', () => {
    cy.get(`span:contains("${taskTitle}")`)
      .closest('.todo-list-item')
      .as('taskItem')

    cy.get('@taskItem').find('input[type="checkbox"]').should('not.be.checked')

    cy.get('@taskItem').find('input[type="checkbox"]').check()
    cy.get('@taskItem').find('input[type="checkbox"]').should('be.checked')
    cy.get('@taskItem')
      .find(`span:contains("${taskTitle}")`)
      .should('have.class', 'line-through')
    cy.get('@taskItem').find('input[type="checkbox"]').uncheck()
    cy.get('@taskItem').find('input[type="checkbox"]').should('not.be.checked')
    cy.get('@taskItem')
      .get(`span:contains("${taskTitle}")`)
      .should('not.have.class', 'line-through')
  })

  it('should delete task', () => {
    cy.get(`span:contains("${taskTitle}")`)
      .closest('.todo-list-item')
      .find('.delete-task')
      .click()
    cy.get(`span:contains("${taskTitle}")`).should('not.exist')
  })
})

describe('task sorting tests', () => {
  before(()=>{
    cy.visit('http://localhost:3000')
    cy.createTask('d', TaskPriority.normal)
    cy.createTask('f', TaskPriority.normal)
    cy.createTask('b', TaskPriority.low)
    cy.createTask('a', TaskPriority.normal)
    cy.createTask('e', TaskPriority.high)
    cy.createTask('c', TaskPriority.normal)
  })

  it('default sorting ascending', () => {
    cy.get('.todos-list .todo-list-item ')
      .first()
      .find('.task-title')
      .contains('d')
    cy.get('.todos-list .todo-list-item ')
      .last()
      .find('.task-title')
      .contains('c')
  })

  it('default sorting descending', () => {
    cy.get('.sort-direction').click()
    cy.get('.todos-list .todo-list-item ')
      .first()
      .find('.task-title')
      .contains('c')
    cy.get('.todos-list .todo-list-item ')
      .last()
      .find('.task-title')
      .contains('d')
    cy.get('.sort-direction').click() //revert to ascending
  })

  it('name sorting ascending', () => {
    cy.get('.sort-field').select(TasksSortField.name)
    cy.get('.todos-list .todo-list-item ')
      .first()
      .find('.task-title')
      .contains('a')
    cy.get('.todos-list .todo-list-item ')
      .last()
      .find('.task-title')
      .contains('f')
  })

  it('name sorting descending', () => {
    cy.get('.sort-field').select(TasksSortField.name)
    cy.get('.sort-direction').click()
    cy.get('.todos-list .todo-list-item ')
      .first()
      .find('.task-title')
      .contains('f')
    cy.get('.todos-list .todo-list-item ')
      .last()
      .find('.task-title')
      .contains('a')
    cy.get('.sort-direction').click() //revert to ascending
  })

  it('priority sorting ascending', () => {
    cy.get('.sort-field').select(TasksSortField.priority)
    cy.get('.todos-list .todo-list-item ')
      .first()
      .find('.task-title')
      .contains('b')
    cy.get('.todos-list .todo-list-item ')
      .last()
      .find('.task-title')
      .contains('e')
  })

  it('priority sorting descending', () => {
    cy.get('.sort-field').select(TasksSortField.priority)
    cy.get('.sort-direction').click()
    cy.get('.todos-list .todo-list-item ')
      .first()
      .find('.task-title')
      .contains('e')
    cy.get('.todos-list .todo-list-item ')
      .last()
      .find('.task-title')
      .contains('b')
    cy.get('.sort-direction').click() //revert to ascending
  })
})
