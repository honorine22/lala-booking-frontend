'use client';
import { motion } from 'framer-motion';

export default function ProfilePage() {

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg border mx-auto max-w-screen-md">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User Profile
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    This is some information about the user.
                </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    {/* Full name */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                        <dt className="text-sm font-medium text-gray-500">
                            Full name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            John Doe
                        </dd>
                    </motion.div>

                    {/* Email address */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                        <dt className="text-sm font-medium text-gray-500">
                            Email address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            johndoe@example.com
                        </dd>
                    </motion.div>

                    {/* Phone number */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                        <dt className="text-sm font-medium text-gray-500">
                            Phone number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            (123) 456-7890
                        </dd>
                    </motion.div>

                    {/* Address */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                        <dt className="text-sm font-medium text-gray-500">
                            Address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            123 Main St<br />
                            Anytown, USA 12345
                        </dd>
                    </motion.div>
                </dl>
            </div>
        </div>
    );
}
