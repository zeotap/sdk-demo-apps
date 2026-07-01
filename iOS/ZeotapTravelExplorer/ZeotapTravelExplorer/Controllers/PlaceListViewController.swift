import UIKit
import ZeotapCollect

/// Displays list of places for a selected category.
///
/// Zeotap SDK integration:
/// - Tracks page view with setPageProperties for this place list screen
/// - Tracks "Place List Viewed" event with category info
/// - Tracks "Place Clicked" event when a place is selected
class PlaceListViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {

    private let categoryId: String
    private let categoryName: String
    private var places: [Place] = []
    private let tableView = UITableView()

    init(categoryId: String, categoryName: String) {
        self.categoryId = categoryId
        self.categoryName = categoryName
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        title = categoryName
        navigationController?.navigationBar.prefersLargeTitles = false
        view.backgroundColor = UIColor(red: 0.98, green: 0.98, blue: 0.98, alpha: 1.0)
        places = TravelData.getPlacesByCategory(categoryId)
        setupTableView()
        trackPageView()
    }

    private func setupTableView() {
        tableView.dataSource = self
        tableView.delegate = self
        tableView.register(PlaceCell.self, forCellReuseIdentifier: "PlaceCell")
        tableView.separatorStyle = .none
        tableView.backgroundColor = .clear
        tableView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(tableView)

        NSLayoutConstraint.activate([
            tableView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            tableView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            tableView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            tableView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }

    private func trackPageView() {
        // Zeotap SDK: Track page view
        Collect.getInstance()?.setPageProperties([
            "name": "Place List",
            "category": categoryName
        ], { data in
            print("[PlaceListVC] Page properties set: \(String(describing: data))")
        })

        // Zeotap SDK: Track place list view event
        Collect.getInstance()?.setEventProperties("Place List Viewed", [
            "category_id": categoryId,
            "category_name": categoryName,
            "place_count": places.count
        ], { data in
            print("[PlaceListVC] Place list event tracked: \(String(describing: data))")
        })
    }

    // MARK: - UITableViewDataSource

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return places.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "PlaceCell", for: indexPath) as! PlaceCell
        cell.configure(with: places[indexPath.row])
        return cell
    }

    // MARK: - UITableViewDelegate

    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 110
    }

    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        let place = places[indexPath.row]

        // Zeotap SDK: Track place click event
        Collect.getInstance()?.setEventProperties("Place Clicked", [
            "place_id": place.id,
            "place_name": place.name,
            "category": place.category,
            "country": place.country,
            "price_range": place.priceRange
        ], { data in
            print("[PlaceListVC] Place click event tracked: \(String(describing: data))")
        })

        let detailVC = PlaceDetailViewController(placeId: place.id)
        navigationController?.pushViewController(detailVC, animated: true)
    }
}
