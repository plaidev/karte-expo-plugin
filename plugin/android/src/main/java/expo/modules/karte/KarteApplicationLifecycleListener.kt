package expo.modules.karte

import android.app.Application
import expo.modules.core.interfaces.ApplicationLifecycleListener
import io.karte.android.KarteApp
import io.karte.android.core.config.Config
import io.karte.android.inappmessaging.InAppMessagingConfig

class KarteApplicationLifecycleListener : ApplicationLifecycleListener {
  override fun onCreate(application: Application) {
    super.onCreate(application)

    val iamConfig = InAppMessagingConfig.Builder()
      .isEdgeToEdgeEnabled(true)
      .build()
    val config = Config.Builder()
      .libraryConfigs(iamConfig)
      .build()

    KarteApp.setup(application, config)
  }
}
