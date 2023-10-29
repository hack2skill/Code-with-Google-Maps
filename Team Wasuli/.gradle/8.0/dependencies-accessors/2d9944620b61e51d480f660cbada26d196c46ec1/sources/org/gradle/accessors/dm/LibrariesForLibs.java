package org.gradle.accessors.dm;

import org.gradle.api.NonNullApi;
import org.gradle.api.artifacts.MinimalExternalModuleDependency;
import org.gradle.plugin.use.PluginDependency;
import org.gradle.api.artifacts.ExternalModuleDependencyBundle;
import org.gradle.api.artifacts.MutableVersionConstraint;
import org.gradle.api.provider.Provider;
import org.gradle.api.model.ObjectFactory;
import org.gradle.api.provider.ProviderFactory;
import org.gradle.api.internal.catalog.AbstractExternalDependencyFactory;
import org.gradle.api.internal.catalog.DefaultVersionCatalog;
import java.util.Map;
import org.gradle.api.internal.attributes.ImmutableAttributesFactory;
import org.gradle.api.internal.artifacts.dsl.CapabilityNotationParser;
import javax.inject.Inject;

/**
 * A catalog of dependencies accessible via the `libs` extension.
*/
@NonNullApi
public class LibrariesForLibs extends AbstractExternalDependencyFactory {

    private final AbstractExternalDependencyFactory owner = this;
    private final AccompanistLibraryAccessors laccForAccompanistLibraryAccessors = new AccompanistLibraryAccessors(owner);
    private final AndroidLibraryAccessors laccForAndroidLibraryAccessors = new AndroidLibraryAccessors(owner);
    private final AndroidxLibraryAccessors laccForAndroidxLibraryAccessors = new AndroidxLibraryAccessors(owner);
    private final DokkaLibraryAccessors laccForDokkaLibraryAccessors = new DokkaLibraryAccessors(owner);
    private final ExoplayerLibraryAccessors laccForExoplayerLibraryAccessors = new ExoplayerLibraryAccessors(owner);
    private final JacocoLibraryAccessors laccForJacocoLibraryAccessors = new JacocoLibraryAccessors(owner);
    private final KotlinLibraryAccessors laccForKotlinLibraryAccessors = new KotlinLibraryAccessors(owner);
    private final MapsLibraryAccessors laccForMapsLibraryAccessors = new MapsLibraryAccessors(owner);
    private final PoiLibraryAccessors laccForPoiLibraryAccessors = new PoiLibraryAccessors(owner);
    private final TestLibraryAccessors laccForTestLibraryAccessors = new TestLibraryAccessors(owner);
    private final VersionAccessors vaccForVersionAccessors = new VersionAccessors(providers, config);
    private final BundleAccessors baccForBundleAccessors = new BundleAccessors(objects, providers, config, attributesFactory, capabilityNotationParser);
    private final PluginAccessors paccForPluginAccessors = new PluginAccessors(providers, config);

    @Inject
    public LibrariesForLibs(DefaultVersionCatalog config, ProviderFactory providers, ObjectFactory objects, ImmutableAttributesFactory attributesFactory, CapabilityNotationParser capabilityNotationParser) {
        super(config, providers, objects, attributesFactory, capabilityNotationParser);
    }

        /**
         * Creates a dependency provider for coroutines (org.jetbrains.kotlinx:kotlinx-coroutines-test)
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getCoroutines() { return create("coroutines"); }

        /**
         * Creates a dependency provider for material (com.google.android.material:material)
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getMaterial() { return create("material"); }

        /**
         * Creates a dependency provider for ycharts (co.yml:ycharts)
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getYcharts() { return create("ycharts"); }

    /**
     * Returns the group of libraries at accompanist
     */
    public AccompanistLibraryAccessors getAccompanist() { return laccForAccompanistLibraryAccessors; }

    /**
     * Returns the group of libraries at android
     */
    public AndroidLibraryAccessors getAndroid() { return laccForAndroidLibraryAccessors; }

    /**
     * Returns the group of libraries at androidx
     */
    public AndroidxLibraryAccessors getAndroidx() { return laccForAndroidxLibraryAccessors; }

    /**
     * Returns the group of libraries at dokka
     */
    public DokkaLibraryAccessors getDokka() { return laccForDokkaLibraryAccessors; }

    /**
     * Returns the group of libraries at exoplayer
     */
    public ExoplayerLibraryAccessors getExoplayer() { return laccForExoplayerLibraryAccessors; }

    /**
     * Returns the group of libraries at jacoco
     */
    public JacocoLibraryAccessors getJacoco() { return laccForJacocoLibraryAccessors; }

    /**
     * Returns the group of libraries at kotlin
     */
    public KotlinLibraryAccessors getKotlin() { return laccForKotlinLibraryAccessors; }

    /**
     * Returns the group of libraries at maps
     */
    public MapsLibraryAccessors getMaps() { return laccForMapsLibraryAccessors; }

    /**
     * Returns the group of libraries at poi
     */
    public PoiLibraryAccessors getPoi() { return laccForPoiLibraryAccessors; }

    /**
     * Returns the group of libraries at test
     */
    public TestLibraryAccessors getTest() { return laccForTestLibraryAccessors; }

    /**
     * Returns the group of versions at versions
     */
    public VersionAccessors getVersions() { return vaccForVersionAccessors; }

    /**
     * Returns the group of bundles at bundles
     */
    public BundleAccessors getBundles() { return baccForBundleAccessors; }

    /**
     * Returns the group of plugins at plugins
     */
    public PluginAccessors getPlugins() { return paccForPluginAccessors; }

    public static class AccompanistLibraryAccessors extends SubDependencyFactory {
        private final AccompanistSystemuicontrollerLibraryAccessors laccForAccompanistSystemuicontrollerLibraryAccessors = new AccompanistSystemuicontrollerLibraryAccessors(owner);

        public AccompanistLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at accompanist.systemuicontroller
         */
        public AccompanistSystemuicontrollerLibraryAccessors getSystemuicontroller() { return laccForAccompanistSystemuicontrollerLibraryAccessors; }

    }

    public static class AccompanistSystemuicontrollerLibraryAccessors extends SubDependencyFactory implements DependencyNotationSupplier {

        public AccompanistSystemuicontrollerLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for systemuicontroller (com.google.accompanist:accompanist-systemuicontroller)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> asProvider() { return create("accompanist.systemuicontroller"); }

            /**
             * Creates a dependency provider for v0312alpha (com.google.accompanist:accompanist-systemuicontroller)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getV0312alpha() { return create("accompanist.systemuicontroller.v0312alpha"); }

    }

    public static class AndroidLibraryAccessors extends SubDependencyFactory {
        private final AndroidGradleLibraryAccessors laccForAndroidGradleLibraryAccessors = new AndroidGradleLibraryAccessors(owner);

        public AndroidLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at android.gradle
         */
        public AndroidGradleLibraryAccessors getGradle() { return laccForAndroidGradleLibraryAccessors; }

    }

    public static class AndroidGradleLibraryAccessors extends SubDependencyFactory {

        public AndroidGradleLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for plugin (com.android.tools.build:gradle)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getPlugin() { return create("android.gradle.plugin"); }

    }

    public static class AndroidxLibraryAccessors extends SubDependencyFactory {
        private final AndroidxComposeLibraryAccessors laccForAndroidxComposeLibraryAccessors = new AndroidxComposeLibraryAccessors(owner);
        private final AndroidxLifecycleLibraryAccessors laccForAndroidxLifecycleLibraryAccessors = new AndroidxLifecycleLibraryAccessors(owner);
        private final AndroidxMaterialLibraryAccessors laccForAndroidxMaterialLibraryAccessors = new AndroidxMaterialLibraryAccessors(owner);
        private final AndroidxMedia3LibraryAccessors laccForAndroidxMedia3LibraryAccessors = new AndroidxMedia3LibraryAccessors(owner);
        private final AndroidxTestLibraryAccessors laccForAndroidxTestLibraryAccessors = new AndroidxTestLibraryAccessors(owner);
        private final AndroidxToolsLibraryAccessors laccForAndroidxToolsLibraryAccessors = new AndroidxToolsLibraryAccessors(owner);
        private final AndroidxUiLibraryAccessors laccForAndroidxUiLibraryAccessors = new AndroidxUiLibraryAccessors(owner);

        public AndroidxLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for core (androidx.core:core-ktx)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getCore() { return create("androidx.core"); }

        /**
         * Returns the group of libraries at androidx.compose
         */
        public AndroidxComposeLibraryAccessors getCompose() { return laccForAndroidxComposeLibraryAccessors; }

        /**
         * Returns the group of libraries at androidx.lifecycle
         */
        public AndroidxLifecycleLibraryAccessors getLifecycle() { return laccForAndroidxLifecycleLibraryAccessors; }

        /**
         * Returns the group of libraries at androidx.material
         */
        public AndroidxMaterialLibraryAccessors getMaterial() { return laccForAndroidxMaterialLibraryAccessors; }

        /**
         * Returns the group of libraries at androidx.media3
         */
        public AndroidxMedia3LibraryAccessors getMedia3() { return laccForAndroidxMedia3LibraryAccessors; }

        /**
         * Returns the group of libraries at androidx.test
         */
        public AndroidxTestLibraryAccessors getTest() { return laccForAndroidxTestLibraryAccessors; }

        /**
         * Returns the group of libraries at androidx.tools
         */
        public AndroidxToolsLibraryAccessors getTools() { return laccForAndroidxToolsLibraryAccessors; }

        /**
         * Returns the group of libraries at androidx.ui
         */
        public AndroidxUiLibraryAccessors getUi() { return laccForAndroidxUiLibraryAccessors; }

    }

    public static class AndroidxComposeLibraryAccessors extends SubDependencyFactory {
        private final AndroidxComposeMaterialLibraryAccessors laccForAndroidxComposeMaterialLibraryAccessors = new AndroidxComposeMaterialLibraryAccessors(owner);
        private final AndroidxComposeUiLibraryAccessors laccForAndroidxComposeUiLibraryAccessors = new AndroidxComposeUiLibraryAccessors(owner);

        public AndroidxComposeLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for activity (androidx.activity:activity-compose)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getActivity() { return create("androidx.compose.activity"); }

            /**
             * Creates a dependency provider for bom (androidx.compose:compose-bom)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getBom() { return create("androidx.compose.bom"); }

            /**
             * Creates a dependency provider for foundation (androidx.compose.foundation:foundation)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getFoundation() { return create("androidx.compose.foundation"); }

        /**
         * Returns the group of libraries at androidx.compose.material
         */
        public AndroidxComposeMaterialLibraryAccessors getMaterial() { return laccForAndroidxComposeMaterialLibraryAccessors; }

        /**
         * Returns the group of libraries at androidx.compose.ui
         */
        public AndroidxComposeUiLibraryAccessors getUi() { return laccForAndroidxComposeUiLibraryAccessors; }

    }

    public static class AndroidxComposeMaterialLibraryAccessors extends SubDependencyFactory implements DependencyNotationSupplier {

        public AndroidxComposeMaterialLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for material (androidx.compose.material:material)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> asProvider() { return create("androidx.compose.material"); }

            /**
             * Creates a dependency provider for material (androidx.compose.material:material)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getMaterial() { return create("androidx.compose.material.material"); }

    }

    public static class AndroidxComposeUiLibraryAccessors extends SubDependencyFactory implements DependencyNotationSupplier {
        private final AndroidxComposeUiPreviewLibraryAccessors laccForAndroidxComposeUiPreviewLibraryAccessors = new AndroidxComposeUiPreviewLibraryAccessors(owner);

        public AndroidxComposeUiLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for ui (androidx.compose.ui:ui)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> asProvider() { return create("androidx.compose.ui"); }

            /**
             * Creates a dependency provider for tooling (androidx.compose.ui:ui-tooling)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getTooling() { return create("androidx.compose.ui.tooling"); }

        /**
         * Returns the group of libraries at androidx.compose.ui.preview
         */
        public AndroidxComposeUiPreviewLibraryAccessors getPreview() { return laccForAndroidxComposeUiPreviewLibraryAccessors; }

    }

    public static class AndroidxComposeUiPreviewLibraryAccessors extends SubDependencyFactory {

        public AndroidxComposeUiPreviewLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for tooling (androidx.compose.ui:ui-tooling-preview)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getTooling() { return create("androidx.compose.ui.preview.tooling"); }

    }

    public static class AndroidxLifecycleLibraryAccessors extends SubDependencyFactory {
        private final AndroidxLifecycleViewmodelLibraryAccessors laccForAndroidxLifecycleViewmodelLibraryAccessors = new AndroidxLifecycleViewmodelLibraryAccessors(owner);

        public AndroidxLifecycleLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at androidx.lifecycle.viewmodel
         */
        public AndroidxLifecycleViewmodelLibraryAccessors getViewmodel() { return laccForAndroidxLifecycleViewmodelLibraryAccessors; }

    }

    public static class AndroidxLifecycleViewmodelLibraryAccessors extends SubDependencyFactory {

        public AndroidxLifecycleViewmodelLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for compose (androidx.lifecycle:lifecycle-viewmodel-compose)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getCompose() { return create("androidx.lifecycle.viewmodel.compose"); }

    }

    public static class AndroidxMaterialLibraryAccessors extends SubDependencyFactory {

        public AndroidxMaterialLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for v160alpha06 (androidx.compose.material:material)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getV160alpha06() { return create("androidx.material.v160alpha06"); }

    }

    public static class AndroidxMedia3LibraryAccessors extends SubDependencyFactory {
        private final AndroidxMedia3ExoplayerLibraryAccessors laccForAndroidxMedia3ExoplayerLibraryAccessors = new AndroidxMedia3ExoplayerLibraryAccessors(owner);

        public AndroidxMedia3LibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for ui (androidx.media3:media3-ui)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getUi() { return create("androidx.media3.ui"); }

        /**
         * Returns the group of libraries at androidx.media3.exoplayer
         */
        public AndroidxMedia3ExoplayerLibraryAccessors getExoplayer() { return laccForAndroidxMedia3ExoplayerLibraryAccessors; }

    }

    public static class AndroidxMedia3ExoplayerLibraryAccessors extends SubDependencyFactory implements DependencyNotationSupplier {

        public AndroidxMedia3ExoplayerLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for exoplayer (androidx.media3:media3-exoplayer)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> asProvider() { return create("androidx.media3.exoplayer"); }

            /**
             * Creates a dependency provider for dash (androidx.media3:media3-exoplayer-dash)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getDash() { return create("androidx.media3.exoplayer.dash"); }

    }

    public static class AndroidxTestLibraryAccessors extends SubDependencyFactory {
        private final AndroidxTestComposeLibraryAccessors laccForAndroidxTestComposeLibraryAccessors = new AndroidxTestComposeLibraryAccessors(owner);
        private final AndroidxTestJunitLibraryAccessors laccForAndroidxTestJunitLibraryAccessors = new AndroidxTestJunitLibraryAccessors(owner);

        public AndroidxTestLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for core (androidx.test:core)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getCore() { return create("androidx.test.core"); }

            /**
             * Creates a dependency provider for espresso (androidx.test.espresso:espresso-core)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getEspresso() { return create("androidx.test.espresso"); }

            /**
             * Creates a dependency provider for rules (androidx.test:rules)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getRules() { return create("androidx.test.rules"); }

            /**
             * Creates a dependency provider for runner (androidx.test:runner)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getRunner() { return create("androidx.test.runner"); }

        /**
         * Returns the group of libraries at androidx.test.compose
         */
        public AndroidxTestComposeLibraryAccessors getCompose() { return laccForAndroidxTestComposeLibraryAccessors; }

        /**
         * Returns the group of libraries at androidx.test.junit
         */
        public AndroidxTestJunitLibraryAccessors getJunit() { return laccForAndroidxTestJunitLibraryAccessors; }

    }

    public static class AndroidxTestComposeLibraryAccessors extends SubDependencyFactory {

        public AndroidxTestComposeLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for ui (androidx.compose.ui:ui-test-junit4)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getUi() { return create("androidx.test.compose.ui"); }

    }

    public static class AndroidxTestJunitLibraryAccessors extends SubDependencyFactory {

        public AndroidxTestJunitLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for ktx (androidx.test.ext:junit-ktx)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getKtx() { return create("androidx.test.junit.ktx"); }

    }

    public static class AndroidxToolsLibraryAccessors extends SubDependencyFactory {

        public AndroidxToolsLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for core (androidx.privacysandbox.tools:tools-core)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getCore() { return create("androidx.tools.core"); }

    }

    public static class AndroidxUiLibraryAccessors extends SubDependencyFactory implements DependencyNotationSupplier {

        public AndroidxUiLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for ui (androidx.compose.ui:ui)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> asProvider() { return create("androidx.ui"); }

            /**
             * Creates a dependency provider for tooling (androidx.compose.ui:ui-tooling)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getTooling() { return create("androidx.ui.tooling"); }

    }

    public static class DokkaLibraryAccessors extends SubDependencyFactory {

        public DokkaLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for plugin (org.jetbrains.dokka:dokka-gradle-plugin)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getPlugin() { return create("dokka.plugin"); }

    }

    public static class ExoplayerLibraryAccessors extends SubDependencyFactory implements DependencyNotationSupplier {

        public ExoplayerLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for exoplayer (com.google.android.exoplayer:exoplayer)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> asProvider() { return create("exoplayer"); }

            /**
             * Creates a dependency provider for v2151 (com.google.android.exoplayer:exoplayer)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getV2151() { return create("exoplayer.v2151"); }

    }

    public static class JacocoLibraryAccessors extends SubDependencyFactory {
        private final JacocoAndroidLibraryAccessors laccForJacocoAndroidLibraryAccessors = new JacocoAndroidLibraryAccessors(owner);

        public JacocoLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Returns the group of libraries at jacoco.android
         */
        public JacocoAndroidLibraryAccessors getAndroid() { return laccForJacocoAndroidLibraryAccessors; }

    }

    public static class JacocoAndroidLibraryAccessors extends SubDependencyFactory {

        public JacocoAndroidLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for plugin (com.mxalbert.gradle:jacoco-android)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getPlugin() { return create("jacoco.android.plugin"); }

    }

    public static class KotlinLibraryAccessors extends SubDependencyFactory implements DependencyNotationSupplier {
        private final KotlinGradleLibraryAccessors laccForKotlinGradleLibraryAccessors = new KotlinGradleLibraryAccessors(owner);

        public KotlinLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for kotlin (org.jetbrains.kotlin:kotlin-stdlib-jdk7)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> asProvider() { return create("kotlin"); }

        /**
         * Returns the group of libraries at kotlin.gradle
         */
        public KotlinGradleLibraryAccessors getGradle() { return laccForKotlinGradleLibraryAccessors; }

    }

    public static class KotlinGradleLibraryAccessors extends SubDependencyFactory {

        public KotlinGradleLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for plugin (org.jetbrains.kotlin:kotlin-gradle-plugin)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getPlugin() { return create("kotlin.gradle.plugin"); }

    }

    public static class MapsLibraryAccessors extends SubDependencyFactory {
        private final MapsKtxLibraryAccessors laccForMapsKtxLibraryAccessors = new MapsKtxLibraryAccessors(owner);
        private final MapsSecretsLibraryAccessors laccForMapsSecretsLibraryAccessors = new MapsSecretsLibraryAccessors(owner);

        public MapsLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for playservice (com.google.android.gms:play-services-maps)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getPlayservice() { return create("maps.playservice"); }

        /**
         * Returns the group of libraries at maps.ktx
         */
        public MapsKtxLibraryAccessors getKtx() { return laccForMapsKtxLibraryAccessors; }

        /**
         * Returns the group of libraries at maps.secrets
         */
        public MapsSecretsLibraryAccessors getSecrets() { return laccForMapsSecretsLibraryAccessors; }

    }

    public static class MapsKtxLibraryAccessors extends SubDependencyFactory {

        public MapsKtxLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for std (com.google.maps.android:maps-ktx)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getStd() { return create("maps.ktx.std"); }

            /**
             * Creates a dependency provider for utils (com.google.maps.android:maps-utils-ktx)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getUtils() { return create("maps.ktx.utils"); }

    }

    public static class MapsSecretsLibraryAccessors extends SubDependencyFactory {

        public MapsSecretsLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for plugin (com.google.android.libraries.mapsplatform.secrets-gradle-plugin:secrets-gradle-plugin)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getPlugin() { return create("maps.secrets.plugin"); }

    }

    public static class PoiLibraryAccessors extends SubDependencyFactory implements DependencyNotationSupplier {

        public PoiLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for poi (org.apache.poi:poi)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> asProvider() { return create("poi"); }

            /**
             * Creates a dependency provider for ooxml (org.apache.poi:poi-ooxml)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getOoxml() { return create("poi.ooxml"); }

    }

    public static class TestLibraryAccessors extends SubDependencyFactory {

        public TestLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

            /**
             * Creates a dependency provider for junit (junit:junit)
             * This dependency was declared in catalog libs.versions.toml
             */
            public Provider<MinimalExternalModuleDependency> getJunit() { return create("test.junit"); }

    }

    public static class VersionAccessors extends VersionFactory  {

        private final AccompanistVersionAccessors vaccForAccompanistVersionAccessors = new AccompanistVersionAccessors(providers, config);
        private final AndroidxVersionAccessors vaccForAndroidxVersionAccessors = new AndroidxVersionAccessors(providers, config);
        private final ComposeVersionAccessors vaccForComposeVersionAccessors = new ComposeVersionAccessors(providers, config);
        private final GoogleVersionAccessors vaccForGoogleVersionAccessors = new GoogleVersionAccessors(providers, config);
        private final JacocoVersionAccessors vaccForJacocoVersionAccessors = new JacocoVersionAccessors(providers, config);
        private final LifecycleVersionAccessors vaccForLifecycleVersionAccessors = new LifecycleVersionAccessors(providers, config);
        private final Media3VersionAccessors vaccForMedia3VersionAccessors = new Media3VersionAccessors(providers, config);
        private final PoiVersionAccessors vaccForPoiVersionAccessors = new PoiVersionAccessors(providers, config);
        private final ToolsVersionAccessors vaccForToolsVersionAccessors = new ToolsVersionAccessors(providers, config);
        private final UiVersionAccessors vaccForUiVersionAccessors = new UiVersionAccessors(providers, config);
        public VersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: activitycompose (1.7.2)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getActivitycompose() { return getVersion("activitycompose"); }

            /**
             * Returns the version associated to this alias: agp (8.1.1)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getAgp() { return getVersion("agp"); }

            /**
             * Returns the version associated to this alias: androidxtest (1.5.0)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getAndroidxtest() { return getVersion("androidxtest"); }

            /**
             * Returns the version associated to this alias: composecompiler (1.5.3)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getComposecompiler() { return getVersion("composecompiler"); }

            /**
             * Returns the version associated to this alias: coroutines (1.6.4)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getCoroutines() { return getVersion("coroutines"); }

            /**
             * Returns the version associated to this alias: dokka (1.9.0)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getDokka() { return getVersion("dokka"); }

            /**
             * Returns the version associated to this alias: espresso (3.5.1)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getEspresso() { return getVersion("espresso"); }

            /**
             * Returns the version associated to this alias: exoplayer (2.19.1)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getExoplayer() { return getVersion("exoplayer"); }

            /**
             * Returns the version associated to this alias: junit (4.13.2)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getJunit() { return getVersion("junit"); }

            /**
             * Returns the version associated to this alias: junitktx (1.1.5)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getJunitktx() { return getVersion("junitktx"); }

            /**
             * Returns the version associated to this alias: kotlin (1.9.10)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getKotlin() { return getVersion("kotlin"); }

            /**
             * Returns the version associated to this alias: mapsecrets (2.0.1)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getMapsecrets() { return getVersion("mapsecrets"); }

            /**
             * Returns the version associated to this alias: mapsktx (4.0.0)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getMapsktx() { return getVersion("mapsktx"); }

            /**
             * Returns the version associated to this alias: material (1.9.0)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getMaterial() { return getVersion("material"); }

            /**
             * Returns the version associated to this alias: ycharts (2.1.0)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getYcharts() { return getVersion("ycharts"); }

        /**
         * Returns the group of versions at versions.accompanist
         */
        public AccompanistVersionAccessors getAccompanist() { return vaccForAccompanistVersionAccessors; }

        /**
         * Returns the group of versions at versions.androidx
         */
        public AndroidxVersionAccessors getAndroidx() { return vaccForAndroidxVersionAccessors; }

        /**
         * Returns the group of versions at versions.compose
         */
        public ComposeVersionAccessors getCompose() { return vaccForComposeVersionAccessors; }

        /**
         * Returns the group of versions at versions.google
         */
        public GoogleVersionAccessors getGoogle() { return vaccForGoogleVersionAccessors; }

        /**
         * Returns the group of versions at versions.jacoco
         */
        public JacocoVersionAccessors getJacoco() { return vaccForJacocoVersionAccessors; }

        /**
         * Returns the group of versions at versions.lifecycle
         */
        public LifecycleVersionAccessors getLifecycle() { return vaccForLifecycleVersionAccessors; }

        /**
         * Returns the group of versions at versions.media3
         */
        public Media3VersionAccessors getMedia3() { return vaccForMedia3VersionAccessors; }

        /**
         * Returns the group of versions at versions.poi
         */
        public PoiVersionAccessors getPoi() { return vaccForPoiVersionAccessors; }

        /**
         * Returns the group of versions at versions.tools
         */
        public ToolsVersionAccessors getTools() { return vaccForToolsVersionAccessors; }

        /**
         * Returns the group of versions at versions.ui
         */
        public UiVersionAccessors getUi() { return vaccForUiVersionAccessors; }

    }

    public static class AccompanistVersionAccessors extends VersionFactory  {

        public AccompanistVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: accompanist.systemuicontroller (1.5.1)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getSystemuicontroller() { return getVersion("accompanist.systemuicontroller"); }

    }

    public static class AndroidxVersionAccessors extends VersionFactory  {

        private final AndroidxComposeVersionAccessors vaccForAndroidxComposeVersionAccessors = new AndroidxComposeVersionAccessors(providers, config);
        public AndroidxVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: androidx.material (1.6.0-alpha06)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getMaterial() { return getVersion("androidx.material"); }

        /**
         * Returns the group of versions at versions.androidx.compose
         */
        public AndroidxComposeVersionAccessors getCompose() { return vaccForAndroidxComposeVersionAccessors; }

    }

    public static class AndroidxComposeVersionAccessors extends VersionFactory  {

        private final AndroidxComposeMaterialVersionAccessors vaccForAndroidxComposeMaterialVersionAccessors = new AndroidxComposeMaterialVersionAccessors(providers, config);
        public AndroidxComposeVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.androidx.compose.material
         */
        public AndroidxComposeMaterialVersionAccessors getMaterial() { return vaccForAndroidxComposeMaterialVersionAccessors; }

    }

    public static class AndroidxComposeMaterialVersionAccessors extends VersionFactory  {

        public AndroidxComposeMaterialVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: androidx.compose.material.material (1.5.2)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getMaterial() { return getVersion("androidx.compose.material.material"); }

    }

    public static class ComposeVersionAccessors extends VersionFactory  {

        public ComposeVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: compose.bom (2023.09.01)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getBom() { return getVersion("compose.bom"); }

    }

    public static class GoogleVersionAccessors extends VersionFactory  {

        private final GoogleAccompanistVersionAccessors vaccForGoogleAccompanistVersionAccessors = new GoogleAccompanistVersionAccessors(providers, config);
        public GoogleVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: google.exoplayer (2.15.1)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getExoplayer() { return getVersion("google.exoplayer"); }

        /**
         * Returns the group of versions at versions.google.accompanist
         */
        public GoogleAccompanistVersionAccessors getAccompanist() { return vaccForGoogleAccompanistVersionAccessors; }

    }

    public static class GoogleAccompanistVersionAccessors extends VersionFactory  {

        public GoogleAccompanistVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: google.accompanist.systemuicontroller (0.31.2-alpha)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getSystemuicontroller() { return getVersion("google.accompanist.systemuicontroller"); }

    }

    public static class JacocoVersionAccessors extends VersionFactory  {

        private final JacocoToolVersionAccessors vaccForJacocoToolVersionAccessors = new JacocoToolVersionAccessors(providers, config);
        public JacocoVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: jacoco.plugin (0.2.1)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getPlugin() { return getVersion("jacoco.plugin"); }

        /**
         * Returns the group of versions at versions.jacoco.tool
         */
        public JacocoToolVersionAccessors getTool() { return vaccForJacocoToolVersionAccessors; }

    }

    public static class JacocoToolVersionAccessors extends VersionFactory  {

        public JacocoToolVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: jacoco.tool.plugin (0.8.7)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getPlugin() { return getVersion("jacoco.tool.plugin"); }

    }

    public static class LifecycleVersionAccessors extends VersionFactory  {

        private final LifecycleViewmodelVersionAccessors vaccForLifecycleViewmodelVersionAccessors = new LifecycleViewmodelVersionAccessors(providers, config);
        public LifecycleVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the group of versions at versions.lifecycle.viewmodel
         */
        public LifecycleViewmodelVersionAccessors getViewmodel() { return vaccForLifecycleViewmodelVersionAccessors; }

    }

    public static class LifecycleViewmodelVersionAccessors extends VersionFactory  {

        public LifecycleViewmodelVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: lifecycle.viewmodel.compose (2.6.2)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getCompose() { return getVersion("lifecycle.viewmodel.compose"); }

    }

    public static class Media3VersionAccessors extends VersionFactory  {

        private final Media3ExoplayerVersionAccessors vaccForMedia3ExoplayerVersionAccessors = new Media3ExoplayerVersionAccessors(providers, config);
        public Media3VersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: media3.ui (1.1.1)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getUi() { return getVersion("media3.ui"); }

        /**
         * Returns the group of versions at versions.media3.exoplayer
         */
        public Media3ExoplayerVersionAccessors getExoplayer() { return vaccForMedia3ExoplayerVersionAccessors; }

    }

    public static class Media3ExoplayerVersionAccessors extends VersionFactory  implements VersionNotationSupplier {

        public Media3ExoplayerVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the version associated to this alias: media3.exoplayer (1.1.1)
         * If the version is a rich version and that its not expressible as a
         * single version string, then an empty string is returned.
         * This version was declared in catalog libs.versions.toml
         */
        public Provider<String> asProvider() { return getVersion("media3.exoplayer"); }

            /**
             * Returns the version associated to this alias: media3.exoplayer.dash (1.1.1)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getDash() { return getVersion("media3.exoplayer.dash"); }

    }

    public static class PoiVersionAccessors extends VersionFactory  implements VersionNotationSupplier {

        public PoiVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the version associated to this alias: poi (5.2.2)
         * If the version is a rich version and that its not expressible as a
         * single version string, then an empty string is returned.
         * This version was declared in catalog libs.versions.toml
         */
        public Provider<String> asProvider() { return getVersion("poi"); }

            /**
             * Returns the version associated to this alias: poi.ooxml (5.2.2)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getOoxml() { return getVersion("poi.ooxml"); }

    }

    public static class ToolsVersionAccessors extends VersionFactory  {

        public ToolsVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Returns the version associated to this alias: tools.core (1.0.0-alpha06)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getCore() { return getVersion("tools.core"); }

    }

    public static class UiVersionAccessors extends VersionFactory  implements VersionNotationSupplier {

        public UiVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Returns the version associated to this alias: ui (1.5.2)
         * If the version is a rich version and that its not expressible as a
         * single version string, then an empty string is returned.
         * This version was declared in catalog libs.versions.toml
         */
        public Provider<String> asProvider() { return getVersion("ui"); }

            /**
             * Returns the version associated to this alias: ui.tooling (1.5.2)
             * If the version is a rich version and that its not expressible as a
             * single version string, then an empty string is returned.
             * This version was declared in catalog libs.versions.toml
             */
            public Provider<String> getTooling() { return getVersion("ui.tooling"); }

    }

    public static class BundleAccessors extends BundleFactory {

        public BundleAccessors(ObjectFactory objects, ProviderFactory providers, DefaultVersionCatalog config, ImmutableAttributesFactory attributesFactory, CapabilityNotationParser capabilityNotationParser) { super(objects, providers, config, attributesFactory, capabilityNotationParser); }

    }

    public static class PluginAccessors extends PluginFactory {

        public PluginAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

            /**
             * Creates a plugin provider for dokka to the plugin id 'org.jetbrains.dokka'
             * This plugin was declared in catalog libs.versions.toml
             */
            public Provider<PluginDependency> getDokka() { return createPlugin("dokka"); }

    }

}
