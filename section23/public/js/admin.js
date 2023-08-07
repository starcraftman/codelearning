const makeDeleteProduct = (btn) => {
    return () => {
        const prodId = btn.parentNode.querySelector('[name=productId]').value;
        const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
        fetch(
            `/admin/delete/${prodId}`,
            {
                method: 'DELETE',
                headers: {
                    'csrf-token': csrf
                }
            }
        )
        .then(result => result.json())
        .then(data => {
            if (data.message === 'Success!') {
                btn.closest("article").remove();
            }
        })
        .catch(err => console.log(err))
    }
}

$('.btn').each((ind, ent) => {
    if (ent.name == 'deleteBtn') {
        ent.onclick = makeDeleteProduct(ent)
    }
});
