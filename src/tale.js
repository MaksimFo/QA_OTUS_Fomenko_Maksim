// Задание 1
function kolobok(name) {
  switch (name) {
    case 'дедушка':
      console.log('Я от дедушки ушел')
      break
    case 'заяц':
      console.log('Я от зайца ушел')
      break
    case 'лиса':
      console.log('Меня съели')
      break
    default:
      console.log('Такого персонажа нет')
  }
}
kolobok('заяц')

//Задание 2
function newYear(newName) {
  return console.log(`${newName}!${newName}!${newName}!`)
}
newYear('Снегурочка')