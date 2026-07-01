import UIKit
import ZeotapCollect

/// Displays destination categories in a 2-column grid.
///
/// Zeotap SDK integration:
/// - Tracks page view with setPageProperties when screen loads
/// - Tracks "Category Viewed" event when a category is clicked
class CategoryViewController: UIViewController, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout {

    private let categories = TravelData.getCategories()
    private var collectionView: UICollectionView!

    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Explore Destinations"
        navigationController?.setNavigationBarHidden(false, animated: true)
        navigationController?.navigationBar.prefersLargeTitles = true
        view.backgroundColor = UIColor(red: 0.98, green: 0.98, blue: 0.98, alpha: 1.0)
        setupCollectionView()
        trackPageView()
    }

    private func setupCollectionView() {
        let layout = UICollectionViewFlowLayout()
        layout.minimumInteritemSpacing = 12
        layout.minimumLineSpacing = 12
        layout.sectionInset = UIEdgeInsets(top: 16, left: 16, bottom: 16, right: 16)

        collectionView = UICollectionView(frame: .zero, collectionViewLayout: layout)
        collectionView.backgroundColor = .clear
        collectionView.dataSource = self
        collectionView.delegate = self
        collectionView.register(CategoryCell.self, forCellWithReuseIdentifier: "CategoryCell")
        collectionView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(collectionView)

        NSLayoutConstraint.activate([
            collectionView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            collectionView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            collectionView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            collectionView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }

    private func trackPageView() {
        // Zeotap SDK: Track page view
        Collect.getInstance()?.setPageProperties([
            "name": "Categories",
            "category": "Travel"
        ], { data in
            print("[CategoryVC] Page properties set: \(String(describing: data))")
        })

        // Zeotap SDK: Track screen view event
        Collect.getInstance()?.setEventProperties("screen_view", [
            "screen_name": "Categories",
            "category_count": categories.count
        ])
    }

    // MARK: - UICollectionViewDataSource

    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return categories.count
    }

    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "CategoryCell", for: indexPath) as! CategoryCell
        let category = categories[indexPath.item]
        cell.configure(with: category)
        return cell
    }

    // MARK: - UICollectionViewDelegateFlowLayout

    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout,
                        sizeForItemAt indexPath: IndexPath) -> CGSize {
        let padding: CGFloat = 16 * 2 + 12
        let width = (collectionView.frame.width - padding) / 2
        return CGSize(width: width, height: 130)
    }

    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let category = categories[indexPath.item]

        // Zeotap SDK: Track category click
        Collect.getInstance()?.setEventProperties("Category Viewed", [
            "category_id": category.id,
            "category_name": category.name
        ], { data in
            print("[CategoryVC] Category event tracked: \(String(describing: data))")
        })

        let placesVC = PlaceListViewController(categoryId: category.id, categoryName: category.name)
        navigationController?.pushViewController(placesVC, animated: true)
    }
}
