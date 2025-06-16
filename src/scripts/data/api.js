import CONFIG from "../config";

const token = localStorage.getItem("token");
export async function subscribePushNotification({
  endpoint,
  keys: { p256dh, auth },
}) {
  const data = JSON.stringify({
    endpoint,
    keys: { p256dh, auth },
  });

  const fetchResponse = await fetch(
    `${CONFIG.BASE_URL}/notifications/subscribe`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data,
    }
  );
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function unsubscribePushNotification({ endpoint }) {
  const data = JSON.stringify({ endpoint });

  const fetchResponse = await fetch(
    `${CONFIG.BASE_URL}/notifications/subscribe`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data,
    }
  );
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}
