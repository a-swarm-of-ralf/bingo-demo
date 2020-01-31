import Connection from './connection.js'


export default function (host = 'pepper.local', emitter) {
  console.log(`[Connect] Connecting to pepper at ${host}...`)

  if (!window.QiSession) {
    return Promise.reject({ code: 'connect-error', message: "Could not find QiSession. Is the qi script loaded or injected?" });
  }

  const emit = function (...args) {
    if (emitter) {
      return emitter.emit(...args);
    }
  }


  return new Promise(function (resolve, reject) {
    const connection = new Connection()

    const onConnected = function (session) {
      console.log(`[Connect] Connection to pepper[${host}] established.`)
      connection._connected(session)
      resolve(connection)
      emit('connected', true, connection);
    }

    const onDisconnected = function () {
      console.log(`[Connect] Connection to pepper[${host}] broken.`)
      connection._disconnected()
      reject({ code: 'connect-error', message: 'Connection closed' })
      emit('connected', false, connection);
    }

    const onTimeout = function () {
      if (!connection.feedback) {
        console.log(`[Connect] No connection feedback with timeout limit.`)
        connection._timeout()
        reject({ code: 'connect-error', message: 'Connection timeout' })
        emit('connected', false, connection);
      }
    }

    console.log(`[Connect] QiSession("${host}:80")...`)
    QiSession(onConnected, onDisconnected, `${host}:80`)
    setTimeout(onTimeout, 10000)
  })
}