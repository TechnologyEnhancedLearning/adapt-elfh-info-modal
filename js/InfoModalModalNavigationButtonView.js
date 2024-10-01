import Adapt from "core/js/adapt";
import NavigationButtonView from "core/js/views/NavigationButtonView";
import tooltips from "core/js/tooltips";
import notify from "core/js/notify";

export default class InfoModalNavigationButtonView extends NavigationButtonView {
  attributes() {
    const attributes = this.model.toJSON();
    return {
      name: attributes._id,
      role: attributes._role === "button" ? undefined : attributes._role,
      "aria-label": Adapt.adaptInfoModal.config._button.navigationAriaLabel,
      "data-order": attributes._order,
      "data-tooltip-id": "adaptInfoModal",
      "data-event": "infoModalButton",
    };
  }

  static get template() {
    return "InfoModalNavigationButton.jsx";
  }

  className() {
    return "btn-icon nav__btn nav__adaptInfoModal-btn";
  }

  initialize(options) {
    this.config = options.model.get("config");
    super.initialize(options);
    this.setUpEventListeners();
    this.render();

    tooltips.register({
      _id: "adaptInfoModal",
      ...(Adapt.course.get("_globals")?._extensions?._infoModal?._navTooltip ||
        {}),
    });

    // Add dynamic icon class based on the selected icon type from the config
    this.setIconType(); // Call method to set icon class
  }

  setIconType() {
    // Get the icon type from the config (default to 'accessibility' if not set)
    const iconType = this.config._button?._iconType || "accessibility";

    // Get the button element
    const navButton = this.$el; // this.$el refers to the root element of the view (button)

    // Remove any existing icon classes (in case icon was previously set)
    navButton.removeClass(
      "infoModal-icon-accessibility infoModal-icon-information infoModal-icon-help"
    );

    // Add the new icon class based on the config
    navButton.addClass(`infoModal-icon-${iconType}`);
  }

  setUpEventListeners() {
    this.listenTo(Adapt, {
      "navigation:infoModalButton": this.onInfoModalButton,
      "infoModal:confirm": this.onInfoModalConfirm,
      "app:languageChanged": this.remove,
    });
  }

  onInfoModalButton() {
    if (!this.config) return;

    const prompt = this.config._button?._notifyPrompt;

    notify.prompt({
      title: prompt.title,
      body: prompt.body,
      _prompts: [
        {
          promptText: "Close",
        },
      ],
    });
  }
}
