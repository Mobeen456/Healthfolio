import Link from 'next/link';

export default function Test() {
  return (
    <div>
      <h1>Welcome to the Test Management System</h1>
      <nav>
        <ul>
          <li>
            <Link href="/tests">View All Tests</Link>
          </li>
          <li>
            <Link href="/tests/new">Create a New Test</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
