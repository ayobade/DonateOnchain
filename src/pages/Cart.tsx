import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Banner from "../component/Banner";
import Button from "../component/Button";
import { products } from "../data/databank";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeItem } = useCart();

  const getProductById = (id: number) => {
    return products.find((product) => product.id === id);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const product = getProductById(item.id);
      if (product) {
        const price = parseInt(product.price.replace(/[^\d]/g, ""));
        return total + price * item.quantity;
      }
      return total;
    }, 0);
  };

  const shippingCost = 4000;
  const subtotal = calculateSubtotal();

  const formatPrice = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

    return (
        <div>
            <Header />

           {/* Cart section */}
      <section className="px-4 md:px-7 py-12">
        <div className="max-w-6xl mx-auto">
          {cartItems.length === 0 ? (
            /* Empty cart state - centered */
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-black mb-8">
                Shopping bag
              </h1>
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button
                onClick={() => navigate("/shop")}
                variant="primary-bw"
                size="lg"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            /* Cart with items - grid layout */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Shopping bag section */}
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-black mb-8">
                  Shopping bag
                </h1>

                <div className="space-y-6">
                  {cartItems.map((item, index) => {
                    const product = getProductById(item.id);
                    if (!product) return null;

                    return (
                      <div
                        key={`${item.id}-${index}`}
                        className="border-b border-gray-200 pb-6"
                      >
                        <div className="flex gap-4">
                          {/* Product image */}
                          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Product details */}
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-black mb-1">
                              {product.title}
                            </h3>
                            <p className="text-sm text-black mb-3">
                              {item.color} {item.size}
                            </p>

                            {/* Quantity selector */}
                            <div className="mb-3">
                              <label className="text-sm text-black mb-2 block">
                                Quantity
                              </label>
                              <div className="flex items-center gap-2">
                                 <button
                                   onClick={() =>
                                     updateQuantity(item.uniqueId, item.quantity - 1)
                                   }
                                   className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                                 >
                                   <span className="text-base">-</span>
                                 </button>
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateQuantity(
                                      item.uniqueId,
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="w-12 h-8 border border-gray-300 rounded text-center text-sm"
                                  min="0"
                                />
                                 <button
                                   onClick={() =>
                                     updateQuantity(item.uniqueId, item.quantity + 1)
                                   }
                                   className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                                 >
                                   <span className="text-base">+</span>
                                 </button>
                              </div>
                            </div>

                            {/* Remove link */}
                            <button
                              onClick={() => removeItem(item.uniqueId)}
                              className="text-sm text-black hover:text-gray-600 transition-colors"
                            >
                              Remove
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-lg font-medium text-black">
                              {formatPrice(
                                parseInt(product.price.replace(/[^\d]/g, "")) *
                                  item.quantity
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Summary section */}
              <div className="lg:col-span-1">
                <h2 className="text-3xl font-bold text-black mb-8">Summary</h2>

                <div className="bg-gray-100 rounded-lg p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-black">Subtotal</span>
                      <span className="text-black font-medium">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black">Shipping</span>
                      <span className="text-black font-medium">
                        {formatPrice(shippingCost)}
                      </span>
                    </div>
                    <div className="border-t border-gray-300 pt-4">
                      <div className="flex justify-between">
                        <span className="text-black font-semibold text-lg">
                          Total
                        </span>
                        <span className="text-black font-semibold text-lg">
                          {formatPrice(subtotal + shippingCost)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="primary-bw"
                    size="lg"
                    className="w-full"
                    onClick={() => navigate("/checkout")}
                  >
                    Continue to Checkout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

            <Banner />
            <Footer />
        </div>
  );
};

export default Cart;
