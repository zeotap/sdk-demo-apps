import UIKit

class CategoryCell: UICollectionViewCell {

    private let iconLabel = UILabel()
    private let nameLabel = UILabel()
    private let containerView = UIView()

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupUI()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private func setupUI() {
        containerView.layer.cornerRadius = 12
        containerView.clipsToBounds = true
        containerView.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(containerView)

        // Shadow on cell
        contentView.layer.shadowColor = UIColor.black.cgColor
        contentView.layer.shadowOffset = CGSize(width: 0, height: 1)
        contentView.layer.shadowOpacity = 0.08
        contentView.layer.shadowRadius = 4

        iconLabel.font = .systemFont(ofSize: 40)
        iconLabel.textAlignment = .center
        iconLabel.translatesAutoresizingMaskIntoConstraints = false
        containerView.addSubview(iconLabel)

        nameLabel.font = .boldSystemFont(ofSize: 16)
        nameLabel.textColor = UIColor(red: 0.13, green: 0.13, blue: 0.13, alpha: 1.0)
        nameLabel.textAlignment = .center
        nameLabel.translatesAutoresizingMaskIntoConstraints = false
        containerView.addSubview(nameLabel)

        NSLayoutConstraint.activate([
            containerView.topAnchor.constraint(equalTo: contentView.topAnchor),
            containerView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor),
            containerView.trailingAnchor.constraint(equalTo: contentView.trailingAnchor),
            containerView.bottomAnchor.constraint(equalTo: contentView.bottomAnchor),

            iconLabel.centerXAnchor.constraint(equalTo: containerView.centerXAnchor),
            iconLabel.centerYAnchor.constraint(equalTo: containerView.centerYAnchor, constant: -14),

            nameLabel.topAnchor.constraint(equalTo: iconLabel.bottomAnchor, constant: 8),
            nameLabel.centerXAnchor.constraint(equalTo: containerView.centerXAnchor)
        ])
    }

    func configure(with category: Category) {
        iconLabel.text = category.icon
        nameLabel.text = category.name
        containerView.backgroundColor = category.color
    }
}
