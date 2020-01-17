import Connection from './connection.js'


export default function (host = 'pepper.local') {
    console.log(`[Connect] Connecting to pepper at ${host}...`)
    
    if (!window.QiSession) {
      return Promise.reject({ message: "Could not find QiSession. Is the qi script loaded or injected?" });
    }


    return new Promise(function (resolve, reject) { 
      const connection = new Connection()

      const onConnected = function (session) {
        console.log(`[Connect] Connection to pepper[${host}] established.`)
        connection._connected(session)
        resolve(connection)
      }
    
      const onDisconnected = function () {
        console.log(`[Connect] Connection to pepper[${host}] broken.`)
        connection._disconnected()
        reject({ message:'Connection closed'})
      }

      const onTimeout = function () {
        if (!connection.feedback) {
          console.log(`[Connect] No connection feedback with timeout limit.`)
          connection._timeout()
          reject({ message:'Connection timeout'})
        }
      }

      console.log(`[Connect] QiSession("${host}:80")...`)
      QiSession(onConnected, onDisconnected, `${host}:80`)
      setTimeout(onTimeout, 10000)
    })
}