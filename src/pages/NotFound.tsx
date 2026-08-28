import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page py-24 flex flex-col items-center text-center">
      <div className="text-5xl mb-5 opacity-70">🧭</div>
      <h1 className="text-2xl font-display font-bold text-ash-200">Không tìm thấy trang</h1>
      <p className="text-sm text-ash-400 mt-2 max-w-sm">
        Trang bạn tìm không tồn tại hoặc đã được di chuyển.
      </p>
      <Link to="/" className="mt-6">
        <Button>Về trang chủ</Button>
      </Link>
    </div>
  );
}
