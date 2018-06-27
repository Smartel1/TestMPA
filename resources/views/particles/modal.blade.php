<div class="modal fade" id="modal" tabindex="-1"
     role="dialog" aria-labelledby="ModalTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
  <!--header------------------------------------>
      <div class="modal-header">
        <h5 class="modal-title" id="ModalTitle">Отправка заказа</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
  <!--body--------------------------------------->
      <div class="modal-body">
        <form method="post" action={{ url('/order') }} ) id="orderForm">

          <div class="form-group">
            <label for="tel">Телефон</label>
            <input type="number" name="tel" value="{{$tel}}"
                   class="form-control" id="tel"
                   aria-describedby="emailHelp"
                   placeholder="номер телефона"
                   required>
          </div>

          <div class="form-group">
            <label for="address">Адрес доставки</label>
            <input type="text" name="address" value="{{$address}}"
                   class="form-control" id="address"
                   placeholder="укажите подъезд и этаж" required>
          </div>

          <div class="form-group">
              <label for="name">Ваше имя</label>
              <input type="text" name="name" value="{{$name}}"
                     class="form-control" id="name"
                     placeholder="Имя" required>
          </div>

          <div class="form-group">
              <label for="comment">Комментарий</label>
              <textarea  name="comment" rows="3"
                     class="form-control" id="comment"
                     placeholder="работает ли домофон, в какой срок доставить и прочая информация"></textarea>
          </div>
<!--hidden fields-->
          <input type="hidden" name="items">
          {{ csrf_field() }}
<!--/////////////-->
          <div class="modal-footer">
              <button type="submit" class="btn btn-primary"  id="btnSendOrder">Отправить</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
          </div>

        </form>
      </div>
    </div>
  </div>
</div>