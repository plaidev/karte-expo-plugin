package expo.modules.karte

import android.app.Application
import android.content.pm.PackageManager
import expo.modules.core.interfaces.ApplicationLifecycleListener
import io.karte.android.KarteApp
import io.karte.android.core.config.Config
import io.karte.android.inappmessaging.InAppMessagingConfig

private const val KARTE_EDGE_TO_EDGE_ENABLED_KEY = "KARTE_EDGE_TO_EDGE_ENABLED"

class KarteApplicationLifecycleListener : ApplicationLifecycleListener {
  override fun onCreate(application: Application) {
    KarteApp.setup(application, createKarteConfig(application))
  }

  private fun createKarteConfig(application: Application): Config? {
    val meta = application.packageManager
      .getApplicationInfo(application.packageName, PackageManager.GET_META_DATA)
      .metaData
      ?: return null

    val enabled = meta.get(KARTE_EDGE_TO_EDGE_ENABLED_KEY) as? Boolean
      ?: return null

    val iamConfig = InAppMessagingConfig.Builder()
      .isEdgeToEdgeEnabled(enabled)
      .build()

    return Config.Builder()
      .libraryConfigs(iamConfig)
      .build()
  }
}
