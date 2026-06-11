import { motion } from 'framer-motion';

interface MovieTicketProps {
  movie: string;
  date: string;
  seat?: string;
  time?: string;
  className?: string;
}

export function MovieTicket({
  movie,
  date,
  seat = 'A1',
  time = '7:30 PM',
  className = '',
}: MovieTicketProps) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -10 }}
      whileInView={{ opacity: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className={`relative ${className}`}
    >
      <div className="relative bg-scrapbook-cream rounded-lg overflow-hidden shadow-xl border border-gray-200">
        {/* Dashed line separator */}
        <div className="border-t-2 border-dashed border-gray-300 my-0" />

        {/* Theater perforations */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-4 h-8 bg-scrapbook-cream rounded-full" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-4 h-8 bg-scrapbook-cream rounded-full" />

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-caveat text-sm text-scrapbook-rose">Movie Date</p>
              <p className="font-sacramento text-lg">{date}</p>
            </div>
            <div className="text-right">
              <p className="font-caveat text-sm text-scrapbook-rose">Time</p>
              <p className="font-sacramento text-lg">{time}</p>
            </div>
          </div>

          <div className="text-center py-2 border-y border-gray-200">
            <h3 className="font-playfair text-xl font-semibold text-gray-800">
              {movie}
            </h3>
          </div>

          <div className="flex justify-between mt-2">
            <div>
              <p className="font-caveat text-sm text-scrapbook-rose">Seat</p>
              <p className="font-inter text-sm font-medium">{seat}</p>
            </div>
            <div className="text-right">
              <p className="font-caveat text-sm text-scrapbook-rose">Admit One</p>
              <p className="font-inter text-sm font-medium">★</p>
            </div>
          </div>
        </div>

        {/* Barcode */}
        <div className="bg-gray-900 h-8 flex items-end justify-center gap-0.5 pb-1">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="bg-white w-[2px]"
              style={{ height: `${Math.random() * 70 + 30}%` }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
