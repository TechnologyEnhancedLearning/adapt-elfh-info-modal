import Backbone from "backbone";
import Adapt from "core/js/adapt";
import navigation from "core/js/navigation";
import NavigationButtonModel from "core/js/models/NavigationButtonModel";
import InfoModalNavigationButtonView from "./InfoModalModalNavigationButtonView";

class AdaptInfoModal extends Backbone.Controller {
  initialize() {
    this.listenToOnce(Adapt, "adapt:start", this.onStart);
  }

  get config() {
    return Adapt.course.get("_infoModal");
  }

  static get globalsConfig() {
    return Adapt.course.get("_globals")?._extensions?._infoModal;
  }

  onLanguageChange() {
    // have to wait until the navbar is ready
    Adapt.once("navigationView:postRender", this.onStart);
  }

  onStart() {
    if (!this.config?._isEnabled) return;

    const button = this.config._button;

    if (button && button._isEnabled) {
      this.setupNavigationButton();
    }

    this.listenTo(Adapt, "app:languageChanged", this.onLanguageChange);
  }

  setupNavigationButton() {
    if (!this.config?._isEnabled) return;

    const {
      _navOrder = 100,
      _showLabel = true,
      navLabel = "",
    } = AdaptInfoModal.globalsConfig ?? {};

    const model = new NavigationButtonModel({
      _id: "adaptInfoModal",
      _order: _navOrder,
      _showLabel,
      _classes: "btn-icon nav__btn nav__infoModal-btn",
      _iconClasses: "",
      _role: "button",
      text: navLabel,
      config: this.config,
    });

    navigation.addButton(new InfoModalNavigationButtonView({ model }));
  }
}

export default Adapt.adaptInfoModal = new AdaptInfoModal();
