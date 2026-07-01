import UIKit
import ZeotapCollect

/// Login screen where user enters email and password.
///
/// Zeotap SDK integration:
/// - Calls setUserIdentities with the user's email on successful login
/// - Calls setUserProperties with user profile attributes
/// - Tracks "User Logged In" event via setEventProperties
class LoginViewController: UIViewController {

    private let iconLabel = UILabel()
    private let titleLabel = UILabel()
    private let subtitleLabel = UILabel()
    private let emailField = UITextField()
    private let passwordField = UITextField()
    private let loginButton = UIButton(type: .system)

    override func viewDidLoad() {
        super.viewDidLoad()
        navigationController?.setNavigationBarHidden(true, animated: false)
        view.backgroundColor = .white
        setupUI()
    }

    private func setupUI() {
        // Icon
        iconLabel.text = "\u{2708}\u{FE0F}"
        iconLabel.font = .systemFont(ofSize: 56)
        iconLabel.textAlignment = .center
        iconLabel.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(iconLabel)

        // Title
        titleLabel.text = "Welcome Back"
        titleLabel.font = .boldSystemFont(ofSize: 28)
        titleLabel.textColor = UIColor(red: 0.13, green: 0.13, blue: 0.13, alpha: 1.0)
        titleLabel.textAlignment = .center
        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(titleLabel)

        // Subtitle
        subtitleLabel.text = "Sign in to explore the world"
        subtitleLabel.font = .systemFont(ofSize: 16)
        subtitleLabel.textColor = UIColor(red: 0.46, green: 0.46, blue: 0.46, alpha: 1.0)
        subtitleLabel.textAlignment = .center
        subtitleLabel.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(subtitleLabel)

        // Email field
        configureTextField(emailField, placeholder: "Email", keyboardType: .emailAddress)
        emailField.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(emailField)

        // Password field
        configureTextField(passwordField, placeholder: "Password", isSecure: true)
        passwordField.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(passwordField)

        // Login button
        loginButton.setTitle("Sign In", for: .normal)
        loginButton.titleLabel?.font = .boldSystemFont(ofSize: 17)
        loginButton.setTitleColor(.white, for: .normal)
        loginButton.backgroundColor = UIColor(red: 0.10, green: 0.45, blue: 0.91, alpha: 1.0)
        loginButton.layer.cornerRadius = 10
        loginButton.translatesAutoresizingMaskIntoConstraints = false
        loginButton.addTarget(self, action: #selector(loginTapped), for: .touchUpInside)
        view.addSubview(loginButton)

        NSLayoutConstraint.activate([
            iconLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            iconLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 80),

            titleLabel.topAnchor.constraint(equalTo: iconLabel.bottomAnchor, constant: 20),
            titleLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),

            subtitleLabel.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 8),
            subtitleLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),

            emailField.topAnchor.constraint(equalTo: subtitleLabel.bottomAnchor, constant: 40),
            emailField.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 32),
            emailField.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -32),
            emailField.heightAnchor.constraint(equalToConstant: 50),

            passwordField.topAnchor.constraint(equalTo: emailField.bottomAnchor, constant: 16),
            passwordField.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 32),
            passwordField.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -32),
            passwordField.heightAnchor.constraint(equalToConstant: 50),

            loginButton.topAnchor.constraint(equalTo: passwordField.bottomAnchor, constant: 28),
            loginButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 32),
            loginButton.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -32),
            loginButton.heightAnchor.constraint(equalToConstant: 52)
        ])

        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(dismissKeyboard))
        view.addGestureRecognizer(tapGesture)
    }

    private func configureTextField(_ textField: UITextField, placeholder: String,
                                    keyboardType: UIKeyboardType = .default, isSecure: Bool = false) {
        textField.placeholder = placeholder
        textField.borderStyle = .none
        textField.keyboardType = keyboardType
        textField.isSecureTextEntry = isSecure
        textField.font = .systemFont(ofSize: 16)
        textField.layer.cornerRadius = 8
        textField.layer.borderWidth = 1
        textField.layer.borderColor = UIColor(red: 0.85, green: 0.85, blue: 0.85, alpha: 1.0).cgColor
        textField.leftView = UIView(frame: CGRect(x: 0, y: 0, width: 14, height: 50))
        textField.leftViewMode = .always
        textField.autocapitalizationType = .none
    }

    @objc private func dismissKeyboard() {
        view.endEditing(true)
    }

    @objc private func loginTapped() {
        let email = emailField.text?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
        let password = passwordField.text?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""

        if email.isEmpty {
            showAlert("Email is required")
            return
        }
        if password.isEmpty {
            showAlert("Password is required")
            return
        }

        // Zeotap SDK: Set user identities
        Collect.getInstance()?.setUserIdentities([
            "email": email,
            "loginid": email
        ], { data in
            print("[LoginVC] User identities set: \(String(describing: data))")
        })

        // Zeotap SDK: Set user properties
        Collect.getInstance()?.setUserProperties([
            "loginMethod": "email_password",
            "appVersion": Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "1.0",
            "platform": "iOS"
        ], { data in
            print("[LoginVC] User properties set: \(String(describing: data))")
        })

        // Zeotap SDK: Track login event
        Collect.getInstance()?.setEventProperties("User Logged In", [
            "method": "email_password",
            "email_provided": true
        ], { data in
            print("[LoginVC] Login event tracked: \(String(describing: data))")
        })

        navigateToCategories()
    }

    private func navigateToCategories() {
        let categoryVC = CategoryViewController()
        navigationController?.setViewControllers([categoryVC], animated: true)
    }

    private func showAlert(_ message: String) {
        let alert = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
}
