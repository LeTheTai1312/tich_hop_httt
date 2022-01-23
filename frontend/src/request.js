import Axios from 'axios';




export async function postFormAsync(url, data) {
    try {
        let formData = new FormData();
        for (const i in data) {
            formData.append(i, data[i]);
        }
        const response = await Axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response;
    } catch (ex) {
        const { status = 400, data = null, errors = [] } = ex.response || null;
        const error = data?.errors || [];
        return { status, data: ex?.response?.data || {}, errors, message: (error[0]?.message || '') }
    }
}

export async function getAsync(url, param) {
    try {
        const response = await Axios.get(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            params: param
        })

        return response;
    } catch (ex) {
        const { status = 400, data = null } = ex?.response || null;
        const error = data?.errors || [];
        return { status, data: {}, message: (error[0]?.message || ''), code: (error[0]?.code || 0) }
    }
}

export async function patchAsync(url, data) {
    try {
        let formData = new FormData();
        for (const i in data) {
            formData.append(i, data[i]);
        }
        const response = await Axios.patch(url, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return response;
    } catch (ex) {
        const { status = 400, data = {}, errors = [] } = ex?.response || {};
        const error = data?.errors || [];
        return { status, data: ex?.response?.data || {}, errors, message: (error[0]?.message || '') }
    }
}

export async function patchNormalAsync(url, data) {
  try {
      const response = await Axios.patch(url, data, {
          headers: {
          }
      })
      return response;
  } catch (ex) {
      const { status = 400, data = {}, errors = [] } = ex.response || {};
      const error = data?.errors || [];
      return { status, data: ex?.response?.data || {}, errors, message: (error[0]?.message || '') }
  }
}

export async function patchFormAsync(url, data) {
    try {
        let formData = new FormData();
        for (const i in data) {
            formData.append(i, data[i]);
        }
        const response = await Axios.patch(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response;
    } catch (ex) {
        const { status = 400, data = {}, errors = [] } = ex.response || {};
        const error = data?.errors || [];
        return { status, data: ex?.response?.data || {}, errors, message: (error[0]?.message || '') }
    }
}

export async function deleteAsync(url) {
    try {
        const response = await Axios.delete(url, {
            headers: {

                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return response;
    } catch (ex) {
        const { status = 400, data = null, errors = [] } = ex.response || null;
        const error = data?.errors || [];
        return { status, data: ex?.response?.data || {}, errors, message: (error[0]?.message || '') }
    }
}

export async function postAsync(url, data) {
    try {
        const response = await Axios.post(url,
            data,
            {
                headers: {

                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
        return response;
    } catch (ex) {
        const { status = 400, data = {}, errors = [] } = ex.response || {};
        const error = data?.errors || [];
        return { status, data: ex?.response?.data || {}, errors, message: (error[0]?.message || '') }
    }
}

export async function putAsync(url, data) {
    try {
        const response = await Axios.put(url,
            data,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
        return response;
    } catch (ex) {
        const { status = 400, data = {}, errors = [] } = ex.response || {};
        const error = data?.errors || [];
        return { status, data: ex?.response?.data || {}, errors, message: (error[0]?.message || '') }
    }
}
