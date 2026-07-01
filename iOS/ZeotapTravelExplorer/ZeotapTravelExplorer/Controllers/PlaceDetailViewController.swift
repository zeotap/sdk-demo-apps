import UIKit
import ZeotapCollect

/// Displays detailed information about a single place.
///
/// Zeotap SDK integration:
/// - Tracks page view with setPageProperties for place detail screen
/// - Tracks "Place Viewed" event with full place details
/// - Tracks "Trip Planned" event on plan trip click
/// - Tracks "Place Saved to Wishlist" event on save click
class PlaceDetailViewController: UIViewController {

    private let placeId: String
    private var place: Place?

    private let scrollView = UIScrollView()
    private let contentView = UIView()
    private let iconLabel = UILabel()
    private let countryLabel = UILabel()
    private let nameLabel = UILabel()
    private let priceLabel = UILabel()
    private let ratingBadge = UILabel()
    private let seasonLabel = UILabel()
    private let durationLabel = UILabel()
    private let descriptionTitleLabel = UILabel()
    private let descriptionLabel = UILabel()
    private let planTripButton = UIButton(type: .system)
    private let wishlistButton = UIButton(type: .system)
    private let buttonStack = UIStackView()

    init(placeId: String) {
        self.placeId = placeId
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        place = TravelData.getPlaceById(placeId)

        guard let place = place else {
            navigationController?.popViewController(animated: true)
            return
        }

        title = place.name
        setupUI()
        bindData(place)
        trackPlaceView(place)
    }

    private func setupUI() {
        // ScrollView
        scrollView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(scrollView)

        contentView.translatesAutoresizingMaskIntoConstraints = false
        scrollView.addSubview(contentView)

        // Icon
        iconLabel.font = .systemFont(ofSize: 64)
        iconLabel.textAlignment = .center
        iconLabel.translatesAutoresizingMaskIntoConstraints = false

        let iconContainer = UIView()
        iconContainer.backgroundColor = UIColor(red: 0.96, green: 0.96, blue: 0.96, alpha: 1.0)
        iconContainer.translatesAutoresizingMaskIntoConstraints = false
        iconContainer.addSubview(iconLabel)
        contentView.addSubview(iconContainer)

        // Country
        countryLabel.font = .boldSystemFont(ofSize: 14)
        countryLabel.textColor = UIColor(red: 0.10, green: 0.45, blue: 0.91, alpha: 1.0)
        countryLabel.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(countryLabel)

        // Name
        nameLabel.font = .boldSystemFont(ofSize: 24)
        nameLabel.textColor = UIColor(red: 0.13, green: 0.13, blue: 0.13, alpha: 1.0)
        nameLabel.numberOfLines = 0
        nameLabel.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(nameLabel)

        // Price + Rating row
        let infoStack = UIStackView()
        infoStack.axis = .horizontal
        infoStack.alignment = .center
        infoStack.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(infoStack)

        priceLabel.font = .boldSystemFont(ofSize: 22)
        priceLabel.textColor = UIColor(red: 1.0, green: 0.44, blue: 0.0, alpha: 1.0)
        infoStack.addArrangedSubview(priceLabel)

        let spacer = UIView()
        infoStack.addArrangedSubview(spacer)

        ratingBadge.font = .boldSystemFont(ofSize: 14)
        ratingBadge.textColor = .white
        ratingBadge.backgroundColor = UIColor(red: 0.30, green: 0.69, blue: 0.31, alpha: 1.0)
        ratingBadge.layer.cornerRadius = 4
        ratingBadge.clipsToBounds = true
        ratingBadge.textAlignment = .center
        ratingBadge.translatesAutoresizingMaskIntoConstraints = false
        infoStack.addArrangedSubview(ratingBadge)

        // Season + Duration
        seasonLabel.font = .systemFont(ofSize: 14)
        seasonLabel.textColor = UIColor(red: 0.46, green: 0.46, blue: 0.46, alpha: 1.0)
        seasonLabel.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(seasonLabel)

        durationLabel.font = .systemFont(ofSize: 14)
        durationLabel.textColor = UIColor(red: 0.46, green: 0.46, blue: 0.46, alpha: 1.0)
        durationLabel.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(durationLabel)

        // Separator
        let separator = UIView()
        separator.backgroundColor = UIColor(red: 0.96, green: 0.96, blue: 0.96, alpha: 1.0)
        separator.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(separator)

        // Description
        descriptionTitleLabel.text = "About this Destination"
        descriptionTitleLabel.font = .boldSystemFont(ofSize: 18)
        descriptionTitleLabel.textColor = UIColor(red: 0.13, green: 0.13, blue: 0.13, alpha: 1.0)
        descriptionTitleLabel.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(descriptionTitleLabel)

        descriptionLabel.font = .systemFont(ofSize: 15)
        descriptionLabel.textColor = UIColor(red: 0.46, green: 0.46, blue: 0.46, alpha: 1.0)
        descriptionLabel.numberOfLines = 0
        descriptionLabel.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(descriptionLabel)

        // Buttons
        buttonStack.axis = .horizontal
        buttonStack.spacing = 12
        buttonStack.distribution = .fillEqually
        buttonStack.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(buttonStack)

        wishlistButton.setTitle("Save to Wishlist", for: .normal)
        wishlistButton.titleLabel?.font = .boldSystemFont(ofSize: 16)
        wishlistButton.setTitleColor(UIColor(red: 0.10, green: 0.45, blue: 0.91, alpha: 1.0), for: .normal)
        wishlistButton.layer.cornerRadius = 10
        wishlistButton.layer.borderWidth = 1
        wishlistButton.layer.borderColor = UIColor(red: 0.10, green: 0.45, blue: 0.91, alpha: 1.0).cgColor
        wishlistButton.addTarget(self, action: #selector(wishlistTapped), for: .touchUpInside)
        buttonStack.addArrangedSubview(wishlistButton)

        planTripButton.setTitle("Plan Trip", for: .normal)
        planTripButton.titleLabel?.font = .boldSystemFont(ofSize: 16)
        planTripButton.setTitleColor(.white, for: .normal)
        planTripButton.backgroundColor = UIColor(red: 1.0, green: 0.44, blue: 0.0, alpha: 1.0)
        planTripButton.layer.cornerRadius = 10
        planTripButton.addTarget(self, action: #selector(planTripTapped), for: .touchUpInside)
        buttonStack.addArrangedSubview(planTripButton)

        NSLayoutConstraint.activate([
            scrollView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            scrollView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            scrollView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            scrollView.bottomAnchor.constraint(equalTo: buttonStack.topAnchor, constant: -8),

            contentView.topAnchor.constraint(equalTo: scrollView.topAnchor),
            contentView.leadingAnchor.constraint(equalTo: scrollView.leadingAnchor),
            contentView.trailingAnchor.constraint(equalTo: scrollView.trailingAnchor),
            contentView.bottomAnchor.constraint(equalTo: scrollView.bottomAnchor),
            contentView.widthAnchor.constraint(equalTo: scrollView.widthAnchor),

            iconContainer.topAnchor.constraint(equalTo: contentView.topAnchor),
            iconContainer.leadingAnchor.constraint(equalTo: contentView.leadingAnchor),
            iconContainer.trailingAnchor.constraint(equalTo: contentView.trailingAnchor),
            iconContainer.heightAnchor.constraint(equalToConstant: 200),

            iconLabel.centerXAnchor.constraint(equalTo: iconContainer.centerXAnchor),
            iconLabel.centerYAnchor.constraint(equalTo: iconContainer.centerYAnchor),

            countryLabel.topAnchor.constraint(equalTo: iconContainer.bottomAnchor, constant: 20),
            countryLabel.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 20),

            nameLabel.topAnchor.constraint(equalTo: countryLabel.bottomAnchor, constant: 4),
            nameLabel.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 20),
            nameLabel.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -20),

            infoStack.topAnchor.constraint(equalTo: nameLabel.bottomAnchor, constant: 12),
            infoStack.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 20),
            infoStack.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -20),

            ratingBadge.widthAnchor.constraint(greaterThanOrEqualToConstant: 60),
            ratingBadge.heightAnchor.constraint(equalToConstant: 28),

            seasonLabel.topAnchor.constraint(equalTo: infoStack.bottomAnchor, constant: 12),
            seasonLabel.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 20),

            durationLabel.topAnchor.constraint(equalTo: seasonLabel.bottomAnchor, constant: 4),
            durationLabel.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 20),

            separator.topAnchor.constraint(equalTo: durationLabel.bottomAnchor, constant: 16),
            separator.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 20),
            separator.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -20),
            separator.heightAnchor.constraint(equalToConstant: 1),

            descriptionTitleLabel.topAnchor.constraint(equalTo: separator.bottomAnchor, constant: 16),
            descriptionTitleLabel.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 20),

            descriptionLabel.topAnchor.constraint(equalTo: descriptionTitleLabel.bottomAnchor, constant: 8),
            descriptionLabel.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 20),
            descriptionLabel.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -20),
            descriptionLabel.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -20),

            buttonStack.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
            buttonStack.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
            buttonStack.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -12),
            buttonStack.heightAnchor.constraint(equalToConstant: 48)
        ])
    }

    private func bindData(_ place: Place) {
        iconLabel.text = getIconForCategory(place.categoryId)
        countryLabel.text = place.country
        nameLabel.text = place.name
        priceLabel.text = place.priceRange
        ratingBadge.text = String(format: " \u{2B50} %.1f ", place.rating)
        seasonLabel.text = "\u{2600}\u{FE0F} Best Season: \(place.bestSeason)"
        durationLabel.text = "\u{1F553} Suggested Duration: \(place.durationSuggestion)"
        descriptionLabel.text = place.description
    }

    private func trackPlaceView(_ place: Place) {
        // Zeotap SDK: Track page view
        Collect.getInstance()?.setPageProperties([
            "name": "Place Detail",
            "category": place.category,
            "place_id": place.id
        ], { data in
            print("[PlaceDetailVC] Page properties set: \(String(describing: data))")
        })

        // Zeotap SDK: Track place viewed event
        Collect.getInstance()?.setEventProperties("Place Viewed", [
            "place_id": place.id,
            "place_name": place.name,
            "category": place.category,
            "country": place.country,
            "price_range": place.priceRange,
            "rating": place.rating,
            "best_season": place.bestSeason
        ], { data in
            print("[PlaceDetailVC] Place view event tracked: \(String(describing: data))")
        })
    }

    @objc private func planTripTapped() {
        guard let place = place else { return }

        // Zeotap SDK: Track plan trip event
        Collect.getInstance()?.setEventProperties("Trip Planned", [
            "place_id": place.id,
            "place_name": place.name,
            "category": place.category,
            "country": place.country,
            "price_range": place.priceRange
        ], { data in
            print("[PlaceDetailVC] Plan trip event tracked: \(String(describing: data))")
        })

        let alert = UIAlertController(title: "Trip Planned!",
                                      message: "Your trip to \(place.name) has been added to your plans.",
                                      preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }

    @objc private func wishlistTapped() {
        guard let place = place else { return }

        // Zeotap SDK: Track wishlist event
        Collect.getInstance()?.setEventProperties("Place Saved to Wishlist", [
            "place_id": place.id,
            "place_name": place.name,
            "category": place.category,
            "country": place.country
        ], { data in
            print("[PlaceDetailVC] Wishlist event tracked: \(String(describing: data))")
        })

        let alert = UIAlertController(title: "Saved!",
                                      message: "\(place.name) has been added to your wishlist.",
                                      preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }

    private func getIconForCategory(_ categoryId: String) -> String {
        switch categoryId {
        case "beaches": return "\u{1F3D6}"
        case "mountains": return "\u{1F3D4}"
        case "cities": return "\u{1F3D9}"
        case "historical": return "\u{1F3DB}"
        case "adventure": return "\u{1F3D5}"
        case "islands": return "\u{1F334}"
        default: return "\u{1F30D}"
        }
    }
}
