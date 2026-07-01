import UIKit
import ZeotapCollect

/// First screen shown to the user asking for consent to collect data.
///
/// Zeotap SDK integration:
/// - Calls setConsent(track: true) when user agrees
/// - Calls setConsent(track: false) when user disagrees
class ConsentViewController: UIViewController {

    private let iconLabel = UILabel()
    private let titleLabel = UILabel()
    private let messageTextView = UITextView()
    private let agreeButton = UIButton(type: .system)
    private let disagreeButton = UIButton(type: .system)

    override func viewDidLoad() {
        super.viewDidLoad()
        navigationController?.setNavigationBarHidden(true, animated: false)
        view.backgroundColor = .white
        setupUI()
    }

    private func setupUI() {
        // Icon
        iconLabel.text = "\u{1F6E1}"
        iconLabel.font = .systemFont(ofSize: 60)
        iconLabel.textAlignment = .center
        iconLabel.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(iconLabel)

        // Title
        titleLabel.text = "We Value Your Privacy"
        titleLabel.font = .boldSystemFont(ofSize: 26)
        titleLabel.textColor = UIColor(red: 0.13, green: 0.13, blue: 0.13, alpha: 1.0)
        titleLabel.textAlignment = .center
        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(titleLabel)

        // Message
        messageTextView.text = """
        We use cookies and similar technologies to enhance your travel experience, personalize content, and analyze our traffic. By clicking "I Agree", you consent to our use of these technologies for analytics and personalized experiences.

        Your data helps us:

        • Improve destination recommendations
        • Enhance your browsing experience
        • Provide relevant travel offers
        • Analyze travel preferences

        You can change your preferences at any time in the app settings.
        """
        messageTextView.font = .systemFont(ofSize: 15)
        messageTextView.textColor = UIColor(red: 0.46, green: 0.46, blue: 0.46, alpha: 1.0)
        messageTextView.isEditable = false
        messageTextView.isSelectable = false
        messageTextView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(messageTextView)

        // Agree Button
        agreeButton.setTitle("I Agree", for: .normal)
        agreeButton.titleLabel?.font = .boldSystemFont(ofSize: 17)
        agreeButton.setTitleColor(.white, for: .normal)
        agreeButton.backgroundColor = UIColor(red: 0.10, green: 0.45, blue: 0.91, alpha: 1.0)
        agreeButton.layer.cornerRadius = 10
        agreeButton.translatesAutoresizingMaskIntoConstraints = false
        agreeButton.addTarget(self, action: #selector(agreeTapped), for: .touchUpInside)
        view.addSubview(agreeButton)

        // Disagree Button
        disagreeButton.setTitle("No, Thanks", for: .normal)
        disagreeButton.titleLabel?.font = .boldSystemFont(ofSize: 17)
        disagreeButton.setTitleColor(UIColor(red: 0.38, green: 0.38, blue: 0.38, alpha: 1.0), for: .normal)
        disagreeButton.backgroundColor = .white
        disagreeButton.layer.cornerRadius = 10
        disagreeButton.layer.borderWidth = 1
        disagreeButton.layer.borderColor = UIColor(red: 0.62, green: 0.62, blue: 0.62, alpha: 1.0).cgColor
        disagreeButton.translatesAutoresizingMaskIntoConstraints = false
        disagreeButton.addTarget(self, action: #selector(disagreeTapped), for: .touchUpInside)
        view.addSubview(disagreeButton)

        NSLayoutConstraint.activate([
            iconLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 40),
            iconLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),

            titleLabel.topAnchor.constraint(equalTo: iconLabel.bottomAnchor, constant: 16),
            titleLabel.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 24),
            titleLabel.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -24),

            messageTextView.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 16),
            messageTextView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 24),
            messageTextView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -24),
            messageTextView.bottomAnchor.constraint(equalTo: agreeButton.topAnchor, constant: -24),

            agreeButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 24),
            agreeButton.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -24),
            agreeButton.heightAnchor.constraint(equalToConstant: 52),
            agreeButton.bottomAnchor.constraint(equalTo: disagreeButton.topAnchor, constant: -12),

            disagreeButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 24),
            disagreeButton.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -24),
            disagreeButton.heightAnchor.constraint(equalToConstant: 52),
            disagreeButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -24)
        ])
    }

    @objc private func agreeTapped() {
        // Zeotap SDK: Grant consent
        Collect.getInstance()?.setConsent(consent: [
            "track": true,
            "identify": true,
            "analyticsConsent": true,
            "marketingConsent": true
        ], { data in
            print("[ConsentVC] Consent granted: \(String(describing: data))")
        })
        navigateToLogin()
    }

    @objc private func disagreeTapped() {
        // Zeotap SDK: Deny consent
        Collect.getInstance()?.setConsent(consent: [
            "track": false,
            "identify": false,
            "analyticsConsent": false,
            "marketingConsent": false
        ], { data in
            print("[ConsentVC] Consent denied: \(String(describing: data))")
        })
        navigateToLogin()
    }

    private func navigateToLogin() {
        let loginVC = LoginViewController()
        navigationController?.setViewControllers([loginVC], animated: true)
    }
}
