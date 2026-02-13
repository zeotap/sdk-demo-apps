package com.zeotap.ecomm.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.zeotap.ecomm.R;
import com.zeotap.ecomm.data.Product;

import java.util.List;
import java.util.Locale;

public class ProductAdapter extends RecyclerView.Adapter<ProductAdapter.ViewHolder> {

    private final List<Product> products;
    private final OnProductClickListener listener;

    public interface OnProductClickListener {
        void onProductClick(Product product);
    }

    public ProductAdapter(List<Product> products, OnProductClickListener listener) {
        this.products = products;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_product, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Product product = products.get(position);
        holder.tvProductName.setText(product.getName());
        holder.tvProductBrand.setText(product.getBrand());
        holder.tvProductPrice.setText(String.format(Locale.US, "$%.2f", product.getPrice()));
        holder.tvProductRating.setText(String.format(Locale.US, "\u2B50 %.1f", product.getRating()));

        String icon = getIconForCategory(product.getCategoryId());
        holder.tvProductIcon.setText(icon);

        holder.itemView.setOnClickListener(v -> listener.onProductClick(product));
    }

    @Override
    public int getItemCount() {
        return products.size();
    }

    private String getIconForCategory(String categoryId) {
        switch (categoryId) {
            case "electronics": return "\uD83D\uDCF1";
            case "clothing": return "\uD83D\uDC55";
            case "books": return "\uD83D\uDCDA";
            case "home": return "\uD83C\uDFE0";
            case "sports": return "\u26BD";
            case "beauty": return "\uD83D\uDC84";
            default: return "\uD83D\uDCE6";
        }
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvProductIcon;
        TextView tvProductName;
        TextView tvProductBrand;
        TextView tvProductPrice;
        TextView tvProductRating;

        ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvProductIcon = itemView.findViewById(R.id.tvProductIcon);
            tvProductName = itemView.findViewById(R.id.tvProductName);
            tvProductBrand = itemView.findViewById(R.id.tvProductBrand);
            tvProductPrice = itemView.findViewById(R.id.tvProductPrice);
            tvProductRating = itemView.findViewById(R.id.tvProductRating);
        }
    }
}
