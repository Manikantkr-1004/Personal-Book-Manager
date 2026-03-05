

export default function StatusCard({ icon: Icon, label, value, color }) {


    return (
        <div className={`flex items-center gap-3 p-4 rounded-xl border bg-white shadow-sm`}>
            <div className={`p-2 rounded-lg ${color}`}>
                <Icon size={18} className="text-white" />
            </div>
            <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-xl font-bold text-gray-800">{value ?? 0}</p>
            </div>
        </div>
    );
}
