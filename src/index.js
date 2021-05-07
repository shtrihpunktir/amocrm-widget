const { share, switchMap, take, map, repeatWhen, retry } = require('rxjs/operators')
const { ajax } = require('rxjs/ajax');
const { from, zip, interval } = require('rxjs');
console.log('define shtrih widget');

function ShtrihWidget() {
  console.log('load shtrih widget')
  const self = this, // для доступа к объекту из методов
    system = self.system(), //Данный метод возвращает объект с переменными системы.
    langs = self.langs;  //Объект локализации с данными из файла локализации (папки i18n)
  let users$
  this.callbacks = {
    init: function () {
      users$ = ajax.getJSON(self.get_settings().url).pipe(
        share()
      );
      console.log('init shtrih widget')
      users$.pipe(
        switchMap(
          users => zip(
            interval(1000), from(users)
          ).pipe(
            take(users.length),
            map(([_, user]) => user)
          )
        ),
        retry(3),
        repeatWhen(() => interval(30000)),
      ).subscribe(
        user => {
          var notification = {
            text: {
              header: "Outgoing call",
              text: `To ${user.name} (${user.phone})`
            },
            type: "call"
          };
          AMOCRM.notifications.show_notification(notification);
        }
      )
      // new Observable()
      return true;
    },
    bind_actions: function () {
      return true;
    },
    render: function () {
      return true;
    },
    onSave: function ({ fields }) {
      return fields;
    },
  }
  return this;
}

module.exports = ShtrihWidget;