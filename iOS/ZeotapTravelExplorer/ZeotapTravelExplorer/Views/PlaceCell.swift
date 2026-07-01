import UIKit

class PlaceCell: UITableViewCell {

    private let cardView = UIView()
    private let iconLabel = UILabel()
    private let nameLabel = UILabel()
    private let countryLabel = UILabel()
    private let priceLabel = UILabel()
    private let ratingLabel = UILabel()

    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        selectionStyle = .none
        backgroundColor = .clear
        setupUI()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private func setupUI() {
        cardView.backgroundColor = .white
        cardView.layer.cornerRadius = 12
        cardView.layer.shadowColor = UIColor.black.cgColor
        cardView.layer.shadowOffset = CGSize(width: 0, height: 1)
        cardView.layer.shadowOpacity = 0.08
        cardView.layer.shadowRadius = 4
        cardView.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(cardView)

        let iconContainer = UIView()
        iconContainer.backgroundColor = UIColor(red: 0.96, green: 0.96, blue: 0.96, alpha: 1.0)
        iconContainer.layer.cornerRadius = 8
        iconContainer.translatesAutoresizingMaskIntoConstraints = false
        cardView.addSubview(iconContainer)

        iconLabel.font = .systemFont(ofSize: 32)
        iconLabel.textAlignment = .center
        iconLabel.translatesAutoresizingMaskIntoConstraints = false
        iconContainer.addSubview(iconLabel)

        nameLabel.font = .boldSystemFont(ofSize: 16)
        nameLabel.textColor = UIColor(red: 0.13, green: 0.13, blue: 0.13, alpha: 1.0)
        nameLabel.numberOfLines = 2
        nameLabel.translatesAutoresizingMaskIntoConstraints = false
        cardView.addSubview(nameLabel)

        countryLabel.font = .systemFont(ofSize: 13)
        countryLabel.textColor = UIColor(red: 0.46, green: 0.46, blue: 0.46, alpha: 1.0)
        countryLabel.translatesAutoresizingMaskIntoConstraints = false
        cardView.addSubview(countryLabel)

        priceLabel.font = .boldSystemFont(ofSize: 17)
        priceLabel.textColor = UIColor(red: 1.0, green: 0.44, blue: 0.0, alpha: 1.0)
        priceLabel.translatesAutoresizingMaskIntoConstraints = false
        cardView.addSubview(priceLabel)

        ratingLabel.font = .systemFont(ofSize: 13)
        ratingLabel.textColor = UIColor(red: 0.46, green: 0.46, blue: 0.46, alpha: 1.0)
        ratingLabel.translatesAutoresizingMaskIntoConstraints = false
        cardView.addSubview(ratingLabel)

        NSLayoutConstraint.activate([
            cardView.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 6),
            cardView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 16),
            cardView.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -16),
            cardView.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -6),

            iconContainer.leadingAnchor.constraint(equalTo: cardView.leadingAnchor, constant: 16),
            iconContainer.centerYAnchor.constraint(equalTo: cardView.centerYAnchor),
            iconContainer.widthAnchor.constraint(equalToConstant: 70),
            iconContainer.heightAnchor.constraint(equalToConstant: 70),

            iconLabel.centerXAnchor.constraint(equalTo: iconContainer.centerXAnchor),
            iconLabel.centerYAnchor.constraint(equalTo: iconContainer.centerYAnchor),

            nameLabel.topAnchor.constraint(equalTo: cardView.topAnchor, constant: 16),
            nameLabel.leadingAnchor.constraint(equalTo: iconContainer.trailingAnchor, constant: 16),
            nameLabel.trailingAnchor.constraint(equalTo: cardView.trailingAnchor, constant: -16),

            countryLabel.topAnchor.constraint(equalTo: nameLabel.bottomAnchor, constant: 4),
            countryLabel.leadingAnchor.constraint(equalTo: nameLabel.leadingAnchor),

            priceLabel.bottomAnchor.constraint(equalTo: cardView.bottomAnchor, constant: -16),
            priceLabel.leadingAnchor.constraint(equalTo: nameLabel.leadingAnchor),

            ratingLabel.bottomAnchor.constraint(equalTo: cardView.bottomAnchor, constant: -16),
            ratingLabel.trailingAnchor.constraint(equalTo: cardView.trailingAnchor, constant: -16)
        ])
    }

    func configure(with place: Place) {
        iconLabel.text = getIconForCategory(place.categoryId)
        nameLabel.text = place.name
        countryLabel.text = place.country
        priceLabel.text = place.priceRange
        ratingLabel.text = String(format: "\u{2B50} %.1f", place.rating)
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
