package expo.modules.karte

import android.app.Application
import expo.modules.core.interfaces.ApplicationLifecycleListener
import io.karte.android.KarteApp

class KarteApplicationLifecycleListener : ApplicationLifecycleListener {
  override fun onCreate(application: Application) {
    super.onCreate(application)
    KarteApp.setup(application)
  }
}
